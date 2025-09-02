'use client';

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Textarea,
  Input,
  NumberInput,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useUpdateTask, useCreateTask } from '@/store/task/useTaskStore';
import type { ITask } from '@/store/task/types';
import { toaster } from '../ui/toaster';
import { useUser } from '@/store/auth/useAuthStore';
import { useProject } from '@/store/project/useProjectStore';

interface DetailsTaskPorps {
  task?: ITask | null;
  onClose?: () => void;
}

const emptyTask: ITask = {
  id: null,
  title: '',
  status: 'new',
  priority: 1,
  project_id: null,
  assigned_to_id: null,
  description: '',
};

export default function DetailsTask({ task, onClose }: DetailsTaskPorps) {
  const user = useUser();
  const project = useProject();

  const newTask:ITask = {
    ...emptyTask,
    assigned_to_id: user?.user_id ?? '',
    project_id: project?.id ?? '' 
  }
  
  const [localTask, setLocalTask] = useState<ITask>(task ?? newTask);

  useEffect(() => {
    setLocalTask(localTask);
  }, [task]);

  const update = async () => {
    const _newTask:ITask = {
      ...emptyTask,
      assigned_to_id: user?.user_id ?? '',
      project_id: project?.id ?? '' 
    }
    console.log('update', task, newTask, localTask);
    // console.log('update', _newTask, newTask);
    
    if (task?.id) {
      // обновление существующей
      await useUpdateTask(task.id, localTask);
    } else {
      // создание новой
      await useCreateTask(localTask);
    }

    onClose();
  };

  return (
    <Dialog.Root
      size="cover"
      placement="center"
      open={true}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                <Text fontWeight="bold" textStyle="3xl">
                  {localTask.id ? 'Редактирование задачи' : 'Новая задача'}
                </Text>
                <Input
                  placeholder="Название"
                  value={localTask.title}
                  variant="flushed"
                  onChange={(e) =>
                    setLocalTask((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={onClose} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body className="details-task-dialog">
              <div>
                <Text fontWeight="bold" textStyle="3xl">
                  Приоритет
                </Text>
                <NumberInput.Root
                  width="200px"
                  value={localTask.priority}
                  onValueChange={(e) =>
                    setLocalTask((prev) => ({
                      ...prev,
                      priority: Number(e.value),
                    }))
                  }
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
                <Text fontWeight="bold" textStyle="3xl">
                  Описание
                </Text>
                <Textarea
                  variant="flushed"
                  placeholder="Описание"
                  value={localTask.description}
                  onChange={(e) =>
                    setLocalTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <Button onClick={update}>
                {task?.id ? 'Сохранить' : 'Создать'}
              </Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
