import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ITask, ITaskFilter, ITaskList, ITaskState } from './types';
import { apolloClient } from '@/shared/api/apolloClients';
import {
  CreateTaskDocument,
  DeleteTaskDocument,
  TaskStatusEnum,
  TasksDocument,
  UpdateTaskDocument,
  type TaskFieldsFragment,
  type UpdateTaskInput,
} from '@/generated/graphql';

const initialState: ITaskList = {
  tasks: [],
  newTask: null,
  focusTask: null,
  isOneTask: true,
};

const mapTask = (node: TaskFieldsFragment): ITask => ({
  id: node.id,
  title: node.title,
  description: node.description ?? null,
  status: node.status,
  priority: node.priority,
  project_id: node.project?.id ?? null,
  assigned_to_id: node.assigned_to?.id ?? null,
});

const mapTaskList = (
  edges: ({ node?: TaskFieldsFragment | null } | null)[] | null | undefined
): ITask[] =>
  (edges ?? [])
    .map((edge) => edge?.node)
    .filter((node): node is TaskFieldsFragment => node != null)
    .map(mapTask);

const toUpdateInput = (id: string, task: Partial<ITask>): UpdateTaskInput => ({
  id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  project: task.project_id ?? undefined,
  assigned_to: task.assigned_to_id ?? undefined,
});

const taskStore: StateCreator<ITaskState, [['zustand/devtools', never]]> = (
  set,
  get
) => ({
  ...initialState,
  create: async (task: ITask) => {
    const { data } = await apolloClient.mutate({
      mutation: CreateTaskDocument,
      variables: {
        input: {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          project: task.project_id ?? undefined,
          // без исполнителя бэкенд назначит задачу на автора
          assigned_to: task.assigned_to_id ?? undefined,
        },
      },
    });

    const node = data?.createTask?.task;
    if (!node) {
      return null;
    }

    const newTask = mapTask(node);
    set({ newTask, tasks: [newTask, ...get().tasks] });

    return newTask;
  },
  fetch: async (projectId: string, filter: ITaskFilter = {}) => {
    const status = filter.status ?? 'new';

    const { data } = await apolloClient.query({
      query: TasksDocument,
      variables: {
        project: projectId,
        status_list: status === 'all' ? undefined : [status],
        title: filter.text || undefined,
        order: [{ priority: 'DESC' }],
      },
      fetchPolicy: 'network-only',
    });

    set({ tasks: mapTaskList(data?.tasks?.edges) });
  },
  fetchFocusTask: async (projectId: string) => {
    const { data } = await apolloClient.query({
      query: TasksDocument,
      variables: {
        project: projectId,
        status_list: ['new'],
        order: [{ priority: 'DESC' }],
        first: 1,
      },
      fetchPolicy: 'network-only',
    });

    set({ focusTask: mapTaskList(data?.tasks?.edges)[0] ?? null });
  },
  update: async (id: string, patch: Partial<ITask>) => {
    const prevTasks = get().tasks;

    // оптимистично обновляем список, при ошибке откатываем
    set({
      tasks: prevTasks.map((task) =>
        task.id === id ? { ...task, ...patch } : task
      ),
    });

    try {
      const { data } = await apolloClient.mutate({
        mutation: UpdateTaskDocument,
        variables: { input: toUpdateInput(id, patch) },
      });

      const node = data?.updateTask?.task;
      if (node) {
        const updated = mapTask(node);
        set({
          tasks: get().tasks.map((task) => (task.id === id ? updated : task)),
          focusTask: get().focusTask?.id === id ? updated : get().focusTask,
        });
      }
    } catch (error) {
      set({ tasks: prevTasks });
      throw error;
    }
  },
  done: async (id: string) => {
    await get().update(id, { status: TaskStatusEnum.Done });
  },
  remove: async (id: string) => {
    const prevTasks = get().tasks;

    set({ tasks: prevTasks.filter((task) => task.id !== id) });

    try {
      await apolloClient.mutate({
        mutation: DeleteTaskDocument,
        variables: { input: { id } },
      });
    } catch (error) {
      set({ tasks: prevTasks });
      throw error;
    }
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

export const createTask = (task: ITask) => useTaskStore.getState().create(task);
export const fetchTasks = (projectId: string, filter: ITaskFilter = {}) =>
  useTaskStore.getState().fetch(projectId, filter);
export const fetchFocusTask = (projectId: string) =>
  useTaskStore.getState().fetchFocusTask(projectId);
export const updateTask = (id: string, task: Partial<ITask>) =>
  useTaskStore.getState().update(id, task);
export const doneTask = (id: string) => useTaskStore.getState().done(id);
export const removeTask = (id: string) => useTaskStore.getState().remove(id);
export const toggleOneTaskView = () =>
  useTaskStore.getState().toggleOneTaskView();

export const useFocusTask = () => useTaskStore((state) => state.focusTask);
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useNewTask = () => useTaskStore((state) => state.newTask);
export const useOneTaskView = () => useTaskStore((state) => state.isOneTask);
