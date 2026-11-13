import type { TaskStatusEnum } from '@/generated/graphql';

interface ITask {
  // IRI из GraphQL (`/doc/tasks/<uuid>`); null — задача ещё не создана
  id: string | null;
  title: string;
  status: TaskStatusEnum;
  priority: number;
  project_id: string | null;
  assigned_to_id: string | null;
  description: string | null;
}

// Фильтр списка: значения совпадают с тем, что лежит в БД (нижний регистр)
type TaskStatusFilter = 'new' | 'done' | 'all';

interface ITaskFilter {
  status?: TaskStatusFilter;
  text?: string;
}

interface IActon {
  create: (task: ITask) => Promise<ITask | null>;
  fetch: (projectId: string, filter?: ITaskFilter) => Promise<void>;
  fetchFocusTask: (projectId: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  done: (id: string) => Promise<void>;
  update: (id: string, task: Partial<ITask>) => Promise<void>;
  toggleOneTaskView: () => void;
}

interface ITaskList {
  tasks: ITask[];
  newTask: ITask | null;
  focusTask: ITask | null;
  isOneTask: boolean;
}

interface ITaskState extends IActon, ITaskList {}

export type {
  IActon,
  ITask,
  ITaskFilter,
  ITaskList,
  ITaskState,
  TaskStatusFilter,
};
