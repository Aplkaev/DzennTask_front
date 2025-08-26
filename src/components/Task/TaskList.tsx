import { useState, useEffect, use, useRef } from 'react';
import {
  Box,
  Heading,
  HStack,
  Input,
  Button,
  Stack,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { useProject } from '@/store/project/useProjectStore';
import { useTasks, fetchTasks, useCreateTask } from '@/store/task/useTaskStore';
import { useUser } from '@/store/auth/useAuthStore';
import CreateTask from './CreateTask';
import TaskItem from './TaskItem';
import Topbar from '../Topbar/Topbar';
import { toaster } from '@/components/ui/toaster';
import EmptyTask from './EmptyTask';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const project = useProject();
  const tasks = useTasks();
  const taskContainerRef = useRef<HTMLDivElement>(null);
  const [statusFilter, setStatusFilter] = useState<'new' | 'done' | 'all'>(
    'new'
  );
  const filterStatusTask = () => {
    if (statusFilter === 'new') {
      setStatusFilter('done');
    } else if (statusFilter === 'done') {
      setStatusFilter('all');
    } else {
      setStatusFilter('new');
    }
    loadTasks();
  };
  const loadTasks = async () => {
    if (!project) return;
    // нужно получить саму приоритетную
    // но только если такое выставлено в настройках,
    // todo надо сделать настройки юзера
    try {
      await fetchTasks(
        project.id,
        statusFilter === 'all' ? {} : { status: statusFilter }
      );
    } catch (e) {
      tasks.length = 0;
      toaster.create({
        description: e instanceof Error ? e.message : 'Неизвестная ошибка',
        title: 'Ошибка при получение задач',
        type: 'error',
        duration: 5000,
      });
      // можно добавить тостер или нотификацию
    }
  };

  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop =
        taskContainerRef.current.scrollHeight;
    }
    setStatusFilter('new');
    loadTasks();
  }, [project?.id]);

  return (
    <Box p={4} appearance="light" className="task-view">
      <Topbar></Topbar>
      {/* 
        добавить кнопку выполнения
        селектор статуса
        селектор канбана
      */}
      <Stack align="stretch" className="task-items">
        <Stack align="stretch" className="task-items" ref={taskContainerRef}>
          {tasks.length === 0 ? (
            <EmptyTask />
          ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </Stack>
      </Stack>
      <Stack align="flex-start">
        <Checkbox.Root checked={statusFilter !== 'new'}>
          <Checkbox.HiddenInput />
          <Checkbox.Control onClick={filterStatusTask}>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>
            {statusFilter === 'new'
              ? 'Только новые'
              : statusFilter === 'done'
                ? 'Только выполненные'
                : 'Все задачи'}
          </Checkbox.Label>
        </Checkbox.Root>
      </Stack>
      <CreateTask></CreateTask>
    </Box>
  );
}
