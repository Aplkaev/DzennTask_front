import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { IProject, IProjectList, IProjectState } from './types';
import { apolloClient } from '@/shared/api/apolloClients';
import {
  CreateProjectDocument,
  DeleteProjectDocument,
  ProjectsDocument,
  UpdateProjectDocument,
  type ProjectsQuery,
} from '@/generated/graphql';

const initialState: IProjectList = {
  projects: [],
  selectProject: null,
};

type ProjectNode = NonNullable<
  NonNullable<NonNullable<ProjectsQuery['projects']>['edges']>[number]
>['node'];

const mapProject = (node: NonNullable<ProjectNode>): IProject => ({
  id: node.id,
  name: node.name,
  tag: node.tag ?? null,
  description: node.description ?? null,
});

const projectStore: StateCreator<
  IProjectState,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
  ...initialState,
  createProject: async (name: string) => {
    const { data } = await apolloClient.mutate({
      mutation: CreateProjectDocument,
      variables: { input: { name } },
    });

    const newProject = data?.createProject?.project;

    if (!newProject) {
      return;
    }

    set({ projects: [mapProject(newProject), ...get().projects] });
  },
  fetchProjects: async () => {
    const { data } = await apolloClient.query({
      query: ProjectsDocument,
    });

    const projects =
      data?.projects?.edges
        ?.map((edge) => edge?.node)
        .filter((node) => node != null)
        .map(mapProject) ?? [];

    set({ projects });
  },
  clearProjects: async () => {
    set({ projects: [] });
  },
  removeProject: async (id: string) => {
    await apolloClient.mutate({
      mutation: DeleteProjectDocument,
      variables: { input: { id } },
    });

    set({ projects: get().projects.filter((project) => project.id !== id) });

    if (get().selectProject?.id === id) {
      set({ selectProject: null });
    }
  },
  editProject: async (id: string, name: string) => {
    await apolloClient.mutate({
      mutation: UpdateProjectDocument,
      variables: { input: { id, name } },
    });

    set({
      projects: get().projects.map((project) =>
        project.id === id ? { ...project, name } : project
      ),
    });

    const selectProject = get().selectProject;

    if (selectProject?.id === id) {
      set({ selectProject: { ...selectProject, name } });
    }
  },
  selectedProject: async (id: string) => {
    const selectProject = get().projects.find((project) => project.id === id);

    set({ selectProject });
  },
});

const useProjectStore = create<IProjectState>()(
  devtools(
    persist(projectStore, {
      name: 'project-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectProject: state.selectProject,
      }),
    })
  )
);

export const useProjects = () => useProjectStore((state) => state.projects);
export const useProject = (): IProject => {
  const project = useProjectStore((state) => state.selectProject);
  return project;
};
export const fetchProjects = () => useProjectStore.getState().fetchProjects();
export const createProject = (name: string) =>
  useProjectStore.getState().createProject(name);
export const removeProject = (id: string) =>
  useProjectStore.getState().removeProject(id);
export const editProject = (id: string, name: string) =>
  useProjectStore.getState().editProject(id, name);
export const selectedProject = (id: string) =>
  useProjectStore.getState().selectedProject(id);
