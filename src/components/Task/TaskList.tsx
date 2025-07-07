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
import { useTasks, fetchTasks, createTask } from '@/store/task/useTaskStore';
import { useUser } from '@/store/auth/useAuthStore';
import CreateTask from './CreateTask';
import TaskItem from './TaskItem';
import Topbar from '../Topbar/Topbar';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const project = useProject();
  const tasks = useTasks();
  const taskContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop =
        taskContainerRef.current.scrollHeight;
    }

    if (project !== null) {
      // нужно получить саму приоритетную
      // но только если такое выставлено в настройках,
      // todo надо сделать настройки юзера
      fetchTasks(project.id);
      console.log(tasks);
    }
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
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task}></TaskItem>
        ))}
      </Stack>

      <CreateTask></CreateTask>
    </Box>
  );
}
