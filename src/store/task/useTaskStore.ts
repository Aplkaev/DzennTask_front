import { create, type StateCreator } from 'zustand';
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

const mapTaskStatus = (status: string | null): TaskStatusEnum => {
  switch (status) {
    case 'done':
      return TaskStatusEnum.Done;

    case 'new':
    default:
      return TaskStatusEnum.New;
  }
};

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: updateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        title
        descrition
        status
        priority
      }
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($input: deleteTaskInput!) {
    deleteTask(input: $input) {
      task {
        id
      }
    }
  }
`;

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
    const { data } = await apolloClient.query({
      query: TasksDocument,
      variables: {
        project: `${id}`,
      },
    });

    set({ tasks: data.tasks?.edges?.map((edge) => edge?.node) ?? [] });
  },
  done: async (id: string) => {
    apolloClient.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: {
        input: { id, status: TaskStatusEnum.Done },
      },
    });

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'done' } : task
      ),
    }));
  },
  update: async (id: string, updatedTask: ITask) => {
    apolloClient.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: {
        input: {
          id,
          title: updatedTask.title ?? undefined,
          descrition: updatedTask.description ?? undefined,
          status: updatedTask.status ? mapTaskStatus(updatedTask.status) : undefined,
          priority: updatedTask.priority ?? undefined,
          project: updatedTask.project_id ?? undefined,
          assgned_to: updatedTask.assigned_to_id ?? undefined,
        },
      },
    });

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
    apolloClient.mutate({
      mutation: DELETE_TASK_MUTATION,
      variables: {
        input: { id },
      },
    });

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
