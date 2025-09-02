import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { IProject, IProjectList, IProjectState } from './types';

const initialState: IProjectList = {
  projects: [],
  selectProject: null,
};

const projectStore: StateCreator<
  IProjectState,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
  ...initialState,
  createProject: async (name: string) => {
    await api.post('/project', {
      name: name,
    });
  },
  fetchProjects: async () => {
    const { data } = await api.get('/project');
    set({ projects: data.items || [] });
  },
  clearProjects: async () => {
    set({ projects: [] });
  },
  removeProject: async (id: string) => {
    const currentProjects = get().projects;

    const updatedProjects = currentProjects.filter(
      (project) => project.id !== id
    );

    set({ projects: updatedProjects });
  },
  editProject: async (id: string) => {
    const currentProjects = get().projects;

    const updatedProjects = currentProjects.filter(
      (project) => project.id !== id
    );

    set({ projects: updatedProjects });
  },
  selectedProject: async (id: string) => {
    const currentProjects = get().projects;

    const selectProject = currentProjects.find((project) => project.id === id);

    set({ selectProject: selectProject });
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
  if (!project) {
    throw new Error(
      'Project not selected'
    );
  }
  return project;
};
export const fetchProjects = () => useProjectStore.getState().fetchProjects();
export const createProject = (name: string) =>
  useProjectStore.getState().createProject(name);
export const removeProject = (id: string) =>
  useProjectStore.getState().removeProject(id);
export const seletedProject = (id: string) =>
  useProjectStore.getState().selectedProject(id);
