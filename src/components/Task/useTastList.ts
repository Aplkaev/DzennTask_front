// useTaskList.ts
import { useEffect, useRef, useState } from 'react';
import { fetchTasks, useDoneTask, useTasks, useUpdateTask, useCreateTask } from '@/store/task/useTaskStore';
import { toaster } from '@/components/ui/toaster';
import type { ITask } from '@/store/task/types';
import type { IUser } from '@/store/auth/types';
import type { IProject } from '@/store/project/types';

export function useTaskList(project?: IProject, user?: IUser) {
  const tasks = useTasks();
  const taskContainerRef = useRef<HTMLDivElement>(null);

  const [statusFilter, setStatusFilter] = useState<'new' | 'done' | 'all'>('new');
  const [textFilter, setTextFilter] = useState('');
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [maxPriorityTask, setMaxPriorityTask] = useState<ITask>();

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
      toaster.create({ title: 'Задача выполнена!', type: 'success', duration: 5000 });
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
    if (tasks.length === 0) return;

    const taskMaxPriority = [...tasks]
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      .find((task) => task.status === 'new');

    setMaxPriorityTask(taskMaxPriority);
  }, [tasks]);

  return {
    tasks,
    taskContainerRef,
    textFilter,
    setTextFilter,
    statusFilter,
    toggleStatusFilter,
    isOpenDetails,
    setIsOpenDetails,
    maxPriorityTask,
    addTask,
    doneTask,
    loadTasks,
  };
}