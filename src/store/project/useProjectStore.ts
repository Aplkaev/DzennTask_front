import { create, type StateCreator } from 'zustand'
import { api } from '@/shared/api/apiClient'
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

interface IActon { 
  createProject: (name: string) => void;
  fetchProjects: () => void;
  clearProjects: () => void;
  removeProject: (id: string) => void;
  editProject: (id: string) => void
}

interface IProject {
  id: string;
  name: string;
  tag: string | null;
  description: string | null;
}

interface IProjectList {
  projects: IProject[]
}

interface IProjectState extends IActon, IProjectList {}

const initialState: IProjectList = {
  projects: []
}

const projectStore: StateCreator<IProjectState,[["zustand/devtools", never], ["zustand/persist", unknown]]> = (set, get) => ({
  ...initialState,
  createProject: async (name: string) => { 
      await api.post('/project', {
        name: name
      })
  },
  fetchProjects: async () => { 
      const { data } = await api.get('/project')
      set({ projects: data.items || [] })
  },
  clearProjects: async () => { 
    set({ projects: [] })
  },
  removeProject: async (id: string) => { 
    const currentProjects = get().projects

    const updatedProjects = currentProjects.filter(project => project.id !== id);
      
    set({ projects: updatedProjects });
  },
  editProject: async (id: string) => { 
    const currentProjects = get().projects
    
    const updatedProjects = currentProjects.filter(project => project.id !== id);
      
    set({ projects: updatedProjects });
  }
});

const useProjectStore = create<IProjectState>()(
  devtools(
    persist(
      projectStore,
      {
        name: 'project-store',
        storage: createJSONStorage(()=>localStorage)
      }
    )
  )
);

export const useProjects = () => useProjectStore((state)=>state.projects);
export const fetchProjects = () => useProjectStore.getState().fetchProjects();
export const createProject = (name: string) => useProjectStore.getState().createProject(name)
export const removeProject = (id: string) => useProjectStore.getState().removeProject(id)
