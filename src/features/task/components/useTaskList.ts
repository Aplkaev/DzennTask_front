// useTaskList.ts
import { useEffect, useRef, useState } from 'react';
import {
  fetchTasks,
  fetchFocusTask,
  useDoneTask,
  useFocusTask,
  useOneTaskView,
  useTasks,
  useUpdateTask,
  useCreateTask,
} from '../useTaskStore';
import { toaster } from '@/components/ui/toaster';
import type { ITask } from '../types';
import type { IUser } from '@/features/auth/types';
import type { IProject } from '@/features/project/types';

export function useTaskList(project?: IProject | null, user?: IUser | null) {
  const tasks = useTasks();
  const focusTask = useFocusTask();
  const isOneTaskView = useOneTaskView();
  const taskContainerRef = useRef<HTMLDivElement>(null);

  const [statusFilter, setStatusFilter] = useState<'new' | 'done' | 'all'>('new');
  const [textFilter, setTextFilter] = useState('');
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const loadTasks = async (text = '') => {    
    if (!project?.id) return;

    try {
      await fetchTasks(project.id, {
        ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
        ...(text ? { text } : {}),
      });
    } catch (e) {
      toaster.create({
        description: e instanceof Error ? e.message : 'Неизвестная ошибка',
        title: 'Ошибка при получении задач',
        type: 'error',
        duration: 5000,
      });
    }
  };

  const addTask = async (newTaskTitle: string) => {
    if (!project?.id || !user) return;

    const newTask: ITask = {
      id: null,
      title: newTaskTitle,
      status: 'new',
      priority: 1,
      project_id: project.id,
      assigned_to_id: user.user_id,
      description: '',
    };

    await useCreateTask(newTask);
    setIsOpenDetails(false);
  };

  const doneTask = (task: ITask) => {
    if (!task.id) return;

    if (task.status !== 'done') {
      toaster.create({ title: 'Задача выполнена!', type: 'success', duration: 1500 });
      useDoneTask(task.id);
    } else {
      useUpdateTask(task.id, { ...task, status: 'new' });
    }
  };

  const toggleStatusFilter = () => {
    setStatusFilter((prev) =>
      prev === 'new' ? 'done' : prev === 'done' ? 'all' : 'new'
    );
  };

  // эффекты
  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop = taskContainerRef.current.scrollHeight;
    }
    loadTasks();
  }, [project?.id]);

  useEffect(() => {
    loadTasks(textFilter);
  }, [statusFilter]);

  useEffect(() => {
    if (!project?.id || !isOneTaskView) return;

    fetchFocusTask(project.id);
  }, [project?.id, isOneTaskView]);

  return {
    tasks,
    taskContainerRef,
    textFilter,
    setTextFilter,
    statusFilter,
    toggleStatusFilter,
    isOpenDetails,
    setIsOpenDetails,
    focusTask,
    isOneTaskView,
    addTask,
    doneTask,
    loadTasks,
  };
}