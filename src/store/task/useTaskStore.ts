import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { devtools } from 'zustand/middleware';

interface IActon {
  create: (task: ITask) => void;
  fetch: (id: string, filter?: Record<string, any>, text?: string) => void;
  remove: (id: string) => void;
  done: (id: string) => void;
  update: (id: string, Task: ITask) => void;
}

interface ITask {
  id: string | null;
  title: string | null;
  status: string | null;
  priority: number | null;
  project_id: string | null;
  assigned_to_id: string | null;
}

interface ITaskList {
  tasks: ITask[];
  newTask: ITask | null;
}

interface ITaskState extends IActon, ITaskList {}

const initialState: ITaskList = {
  tasks: [],
  newTask: null,
};

const taskStore: StateCreator<ITaskState, [['zustand/devtools', never]]> = (
  set,
  get
) => ({
  ...initialState,
  create: async (task: ITask) => {
    const { data } = await api.post('/tasks', task);

    const currentTasks = get().tasks;

    set({ newTask: data });

    set({ tasks: [data, ...currentTasks] });
  },
  getImportant: async (id: string) => {
    const { data } = await api.get(`/tasks/project/${id}`);

    set({ tasks: data.items || [] });
  },
  done: async (id: string) => {
    api.put(`/tasks/${id}/done`);
  },
  update: async (id: string, updatedTask: ITask) => {
    api.put(`/tasks/${id}`, updatedTask);

    const currentTasks = get().tasks;

    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );

    set({ tasks: updatedTasks });
  },
  remove: async (id: string) => {
    api.delete(`/tasks/${id}`);

    const currentProjects = get().tasks;

    const tasks = currentProjects.filter((task) => task.id !== id);

    set({ tasks: tasks });
  },
  fetch: async (
    id: string,
    filter: Record<string, any> = {},
    text?: string
  ) => {
    const params = new URLSearchParams(filter as Record<string, string>);

    if (text) {
      params.set('text', text);
    }
    const url = params
      ? `/tasks/project/${id}?${params.toString()}`
      : `/tasks/project/${id}`;

    const { data } = await api.get(url);

    set({ tasks: data.items || [] });
  },
});

const useTaskStore = create<ITaskState>()(devtools(taskStore));

export const useCreateTask = (task: ITask) =>
  useTaskStore.getState().create(task);
export const fetchTasks = (
  id: string,
  filter: Record<string, any> = {},
  text?: string
) => useTaskStore.getState().fetch(id, filter);
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useDoneTask = (id: string) => useTaskStore.getState().done(id);
export const useRemoveTask = (id: string) => useTaskStore.getState().remove(id);
export const useUpdateTask = (id: string, task: ITask) =>
  useTaskStore.getState().update(id, task);
export const useNewTask = () => useTaskStore((state) => state.newTask);
