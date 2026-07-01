import { IProject, IProjectList } from "../../Entity/Project/types";
interface IActon {
  createProject: (name: string) => void;
  fetchProjects: () => void;
  clearProjects: () => void;
  removeProject: (id: string) => void;
  editProject: (id: string) => void;
  selectedProject: (id: string) => void;
}

interface IProjectState extends IActon, IProjectList {}

export type { IActon, IProject, IProjectList, IProjectState }