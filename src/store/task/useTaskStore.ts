import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { devtools, persist } from 'zustand/middleware';
import type { ITaskList, ITask, ITaskState } from './types';
import OneTask from '@/components/Task/OneTask';
import { apolloClient } from '@/shared/api/apolloClients';
import { gql} from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { CreateTaskDocument, TaskStatusEnum, TasksDocument } from '@/generated/graphql';

const initialState: ITaskList = {
  tasks: [],
  newTask: null,
  isOneTask: true,
};

// const mapTaskStatus = (status: string | null): TaskStatusEnum => {
//   switch (status) {
//     case 'done':
//       return TaskStatusEnum.Done;

//     case 'new':
//     default:
//       return TaskStatusEnum.New;
//   }
// };

// const mapTaskInput = (task: ITask) => ({
//   title: task.title ?? '',
//   descrition: task.description ?? '',
//   priority: task.priority ?? 1,

//   status: mapTaskStatus(task.status),

//   project: task.project_id,
// });

const taskStore: StateCreator<ITaskState, [['zustand/devtools', never]]> = (
  set,
  get
) => ({
  ...initialState,
  create: async (task: ITask) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CreateTaskDocument,

        variables: {
          input: task.mapInput(),
        },
      });

      const newTask = data?.createTask?.task;

      if (!newTask) {
        return null;
      }

      set({
        newTask,

        tasks: [newTask, ...get().tasks],
      });

      return newTask;
    } catch (error) {
      console.error('Create task error', error);

      throw error;
    }
  },
  getImportant: async (id: string) => {
    const { data } = await api.get(`/tasks/project/${id}`);

    set({ tasks: data.items || [] });
  },
  done: async (id: string) => {
    const taskID = id.split('/').slice(-1)[0];
    api.put(`/tasks/${taskID}/done`);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'done' } : task
      ),
    }));
  },
  update: async (id: string, updatedTask: ITask) => {
    const taskID = id.split('/').slice(-1)[0];

    api.put(`/tasks/${taskID}`, updatedTask);

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
      const taskID = id.split('/').slice(-1)[0];
    api.delete(`/tasks/${taskID}`);

    const currentProjects = get().tasks;

    const tasks = currentProjects.filter((task) => task.id !== id);

    set({ tasks: tasks });
  },
  fetch: async (
    id: string,
    filter: Record<string, any> = {},
    text?: string
  ) => {    
    const { data } = await apolloClient.query({
      query: TasksDocument,
      variables: {
        project: `${id}`,
      },
    });

    set({
      tasks: data.tasks?.edges?.map((edge) => edge?.node) ?? [],
    });
  },
  toggleOneTaskView: () => {
    set({ isOneTask: !get().isOneTask });
  },
});
const useTaskStore = create<ITaskState>()(
  persist(devtools(taskStore, { name: 'TaskStore' }), {
    name: 'task-store',
    partialize: (state) => ({ isOneTask: state.isOneTask }),
  })
);

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
