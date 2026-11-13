// useTaskList.ts
import { useEffect, useRef, useState } from 'react';
import {
  createTask,
  doneTask as markTaskDone,
  fetchFocusTask,
  fetchTasks,
  removeTask as deleteTask,
  updateTask,
  useFocusTask,
  useOneTaskView,
  useTasks,
} from '../useTaskStore';
import { toaster } from '@/components/ui/toaster';
import { TaskStatusEnum } from '@/generated/graphql';
import type { ITask, TaskStatusFilter } from '../types';
import type { IUser } from '@/features/auth/types';
import type { IProject } from '@/features/project/types';

const notifyError = (title: string, error: unknown) =>
  toaster.create({
    description: error instanceof Error ? error.message : 'Неизвестная ошибка',
    title,
    type: 'error',
    duration: 5000,
  });

export function useTaskList(project?: IProject | null, user?: IUser | null) {
  const tasks = useTasks();
  const focusTask = useFocusTask();
  const isOneTaskView = useOneTaskView();
  const taskContainerRef = useRef<HTMLDivElement>(null);

  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>('new');
  const [textFilter, setTextFilter] = useState('');
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const loadTasks = async (text = '') => {
    if (!project?.id) return;

    try {
      await fetchTasks(project.id, { status: statusFilter, text });
    } catch (e) {
      notifyError('Ошибка при получении задач', e);
    }
  };

  const loadFocusTask = async () => {
    if (!project?.id) return;

    try {
      await fetchFocusTask(project.id);
    } catch (e) {
      notifyError('Ошибка при получении основной задачи', e);
    }
  };

  const addTask = async (newTaskTitle: string) => {
    if (!project?.id || !user || !newTaskTitle.trim()) return;

    const newTask: ITask = {
      id: null,
      title: newTaskTitle.trim(),
      status: TaskStatusEnum.New,
      priority: 1,
      project_id: project.id,
      assigned_to_id: user.user_id,
      description: '',
    };

    try {
      await createTask(newTask);
      setIsOpenDetails(false);
    } catch (e) {
      notifyError('Ошибка при создании задачи', e);
    }
  };

  const doneTask = async (task: ITask) => {
    if (!task.id) return;

    try {
      if (task.status !== TaskStatusEnum.Done) {
        await markTaskDone(task.id);
        toaster.create({ title: 'Задача выполнена!', type: 'success', duration: 1500 });
      } else {
        await updateTask(task.id, { status: TaskStatusEnum.New });
      }

      if (isOneTaskView) {
        await loadFocusTask();
      }
    } catch (e) {
      notifyError('Ошибка при изменении статуса', e);
    }
  };

  const removeTask = async (task: ITask) => {
    if (!task.id) return;

    try {
      await deleteTask(task.id);
    } catch (e) {
      notifyError('Ошибка при удалении задачи', e);
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
    loadTasks(textFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id, statusFilter]);

  useEffect(() => {
    if (isOneTaskView) {
      loadFocusTask();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    removeTask,
    loadTasks,
  };
}
