interface IActon {
  create: (task: ITask) => void;
  fetch: (id: string, filter?: Record<string, any>, text?: string) => void;
  remove: (id: string) => void;
  done: (id: string) => void;
  update: (id: string, Task: ITask) => void;
  setStatus: (task: ITask, status: string) => void;
  toggleOneTaskView: () => void;
}

interface ITask {
  id: string | null;
  title: string | null;
  status: string | null;
  priority: number | null;
  project_id: string | null;
  assigned_to_id: string | null;
  description: string | null;
}

interface ITaskList {
  tasks: ITask[];
  newTask: ITask | null;
  isOneTask: boolean
}

interface ITaskState extends IActon, ITaskList {}


export type { IActon, ITask, ITaskList, ITaskState }