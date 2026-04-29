import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { devtools, persist } from 'zustand/middleware';
import type { ITaskList, ITask, ITaskState } from './types';
import OneTask from '@/components/Task/OneTask';
import { apolloClient } from '@/shared/api/apolloClients';
import { gql } from '@apollo/client';

const initialState: ITaskList = {
  tasks: [],
  newTask: null,
  isOneTask: true,
};

const mapTaskInput = (task: ITask) => ({
  title: task.title,
  descrition: task.description,
  priority: task.priority,
  status: mapTaskStatus(task.status),
  project: task.project_id,
});
const mapTaskStatus = (status: string | null) => {
  switch (status) {
    case 'new':
      return 'NEW';

    case 'done':
      return 'DONE';

    default:
      return null;
  }
};
export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: createTaskInput!) {
    createTask(input: $input) {
      task {
        id
        title
        status
        priority
        descrition
        project {
          id
        }
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
    const input = mapTaskInput(task);

    const { data } = await apolloClient.mutate({
      mutation: CREATE_TASK_MUTATION,
      variables: {
        input,
      },
    });

    const newTask = data.createTask.task;

    set({
      newTask,
      tasks: [newTask, ...get().tasks],
    });

    // set({ newTask: data });

    // set({ tasks: [data, ...currentTasks] });
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
    const { data } = await apolloClient.query({
      query: gql`
        query {
          tasks(project: "${id}") {
            edges {
              node {
                id
                title
                descrition
                status
                priority
                project {
                  id
                }
              }
            }
          }
        }
      `
    });      
    set({ 
      tasks: data.tasks?.edges?.map((edge: any) => edge.node) || [] 
    });
    

    // const params = new URLSearchParams(filter as Record<string, string>);

    // if (text) {
    //   params.set('text', text);
    // }
    // const url = params
    //   ? `/tasks/project/${id}?${params.toString()}`
    //   : `/tasks/project/${id}`;

    // const { data } = await api.get(url);

    // set({ tasks: data.items || [] });
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
