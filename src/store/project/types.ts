
interface IActon {
  createProject: (name: string) => void;
  fetchProjects: () => void;
  clearProjects: () => void;
  removeProject: (id: string) => void;
  editProject: (id: string) => void;
  selectedProject: (id: string) => void;
}

interface IProject {
  id: string;
  name: string;
  tag: string | null;
  description: string | null;
}

interface IProjectList {
  projects: IProject[];
  selectProject: IProject | null;
}

interface IProjectState extends IActon, IProjectList {}

export type { IActon, IProject, IProjectList, IProjectState }