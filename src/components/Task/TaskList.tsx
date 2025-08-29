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
import { useTasks, fetchTasks, useCreateTask, useOneTaskView, useToggleOneTaskView, useDoneTask, useUpdateTask } from '@/store/task/useTaskStore';
import CreateTask from './CreateTask';
import TaskItem from './TaskItem';
import Topbar from '../Topbar/Topbar';
import { toaster } from '@/components/ui/toaster';
import EmptyTask from './EmptyTask';
import OneTask from './OneTask';
import type { ITask } from '@/store/task/types';

export default function TaskList() {
  const project = useProject();
  const tasks = useTasks();
  const taskContainerRef = useRef<HTMLDivElement>(null);
  const [statusFilter, setStatusFilter] = useState<'new' | 'done' | 'all'>(
    'new'
  );
  const [textFilter, setTextFilter] = useState('');
  // const [isOpenOneTask, setIsOpenOneTask] = useState(true);
  const [maxPriorityTask, setMaxPriorityTask] = useState<ITask>();
  
  const isOpenOneTask = useOneTaskView();
  const toggleOneTaskView = useToggleOneTaskView();

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

    const doneTask = (task:ITask) => {
      if (!task.id) {
        return;
      }
      if (task.status !== 'done') {
        toaster.create({
          title: 'Задача выполнена!!!',
          type: 'success',
          duration: 5000,
        });
        useDoneTask(task.id);
      } else {
        useUpdateTask(task.id, { ...task, status: 'new' });
      }
  };

  const loadTasks = async (text = '') => {
    if (!project) return;
    // нужно получить саму приоритетную
    // но только если такое выставлено в настройках,
    // todo надо сделать настройки юзера
    try {
      await fetchTasks(project.id, {
        ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
        ...(text ? { text } : {}),
      });
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

  useEffect(() => {
    loadTasks(textFilter);
  }, [statusFilter]);

  useEffect(() => {    
    if (tasks.length === 0) {
      return;
    }
    
    const taskMaxPriority = [...tasks].sort(
      (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
    ).find((task:ITask) => task.status === 'new');
    if(!taskMaxPriority) { 
      toggleOneTaskView();
      toaster.create({
        title: 'Ехууу... Все задачи выполнены!!!',
        type: 'success',
        duration: 5000,
      });
      return;
    }
    setMaxPriorityTask(taskMaxPriority);
  }, [tasks]);

  return (
    <Box p={4} appearance="light" className="task-view">
      {maxPriorityTask && isOpenOneTask && (
        <OneTask task={maxPriorityTask} doneTask={doneTask}/>
      )}
      <Topbar
        onSearch={setTextFilter}
        onSubmitSearch={() => loadTasks(textFilter)}
      />
      <Stack align="flex-start" p={4}>
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
      <hr />
      {/* 
        добавить кнопку выполнения
        селектор статуса
        селектор канбана
      */}
      <Stack align="stretch" className="task-items" p={4}>
        <Stack align="stretch" className="task-items" ref={taskContainerRef}>
          {tasks.length === 0 ? (
            <EmptyTask />
          ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} doneTask={doneTask}/>)
          )}
        </Stack>
      </Stack>

      <CreateTask></CreateTask>
    </Box>
  );
}
