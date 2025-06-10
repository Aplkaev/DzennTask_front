import { create, type StateCreator } from 'zustand'
import { api } from '@/shared/api/apiClient'
import { createJSONStorage, persist, devtools } from 'zustand/middleware';


interface IActon {
  create: (task:ITask) => void;
  fetch: (id: string) => void;
  remove: () => void;
  edit: () => void;
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
  tasks: ITask[]
}

interface ITaskState extends IActon, ITaskList {}

const initialState: ITaskList = {
  tasks: []
}

const taskStore: StateCreator<ITaskState,[["zustand/devtools", never], ["zustand/persist", unknown]]> = (set, get) => ({
  ...initialState,
  create: async (task:ITask) => { 
    await api.post('/tasks', task);
    
    const currentTasks = get().tasks

    set({tasks:[...currentTasks, task]})
  },
  fetch: async (id: string) => { 
    const { data } = await api.get(`/tasks/project/${id}`);

    set({tasks: data || []})
  },
  remove: async () => { 

  },
  edit: async () => { 

  },
})

const useTaskStore = create<ITaskState>()(
  devtools(
    persist(
      taskStore,
      {
        name: 'task-store',
        storage: createJSONStorage(()=>localStorage)
      }
    )
  )
)

export const createTask = (task:ITask) => useTaskStore.getState().create(task);
export const fetchTasks = (id: string) => useTaskStore.getState().fetch(id);
export const useTasks = () => useTaskStore((state)=>state.tasks);