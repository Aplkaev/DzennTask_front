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

interface IAction {
  createProject: (name: string) => void;
  fetchProjects: () => void;
  clearProjects: () => void;
  removeProject: (id: string) => void;
  editProject: (id: string, name: string) => void;
  selectedProject: (id: string) => void;
}

interface IProjectState extends IAction, IProjectList {}

export type { IAction, IProject, IProjectList, IProjectState };
