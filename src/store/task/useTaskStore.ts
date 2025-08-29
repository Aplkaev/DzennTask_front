import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { devtools } from 'zustand/middleware';
import type { ITaskList, ITask, ITaskState } from './types';
import OneTask from '@/components/Task/OneTask';

const initialState: ITaskList = {
  tasks: [],
  newTask: null,
  isOneTask: true,
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
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'done' } : task
      ),
    }));
  },
  update: async (id: string, updatedTask: ITask) => {
    api.put(`/tasks/${id}`, updatedTask);

    const currentTasks = get().tasks;

    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );

    set({ tasks: updatedTasks });
  },
  setStatus: async (task: ITask, status: string = 'done') => {
    if (!task.id) {
      return;
    }

    task.status = status;

    get().update(task.id, task);
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
  toggleOneTaskView: () => {
    set({ isOneTask: !get().isOneTask });
  },
});

const useTaskStore = create<ITaskState>()(devtools(taskStore));

export const useCreateTask = (task: ITask) =>
  useTaskStore.getState().create(task);
export const fetchTasks = (
  id: string,
  filter: Record<string, any> = {},
  text?: string
) => useTaskStore.getState().fetch(id, filter, text);
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useDoneTask = (id: string) => useTaskStore.getState().done(id);
export const useRemoveTask = (id: string) => useTaskStore.getState().remove(id);
export const useUpdateTask = (id: string, task: ITask) =>
  useTaskStore.getState().update(id, task);
export const useNewTask = () => useTaskStore((state) => state.newTask);
export const useSetStatus = (task: ITask, status: string) =>
  useTaskStore.getState().setStatus(task, status);
export const useOneTaskView = () => useTaskStore((state) => state.isOneTask);
export const useToggleOneTaskView = () =>
  useTaskStore((state) => state.toggleOneTaskView);
