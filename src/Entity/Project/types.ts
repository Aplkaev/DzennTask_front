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

export type { IProject, IProjectList }