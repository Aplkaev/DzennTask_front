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
import { updateTask, createTask } from '../useTaskStore';
import type { ITask } from '../types';
import { toaster } from '@/components/ui/toaster';
import { useUser } from '@/features/auth/useAuthStore';
import { useProject } from '@/features/project/useProjectStore';
import { TaskStatusEnum } from '@/generated/graphql';

interface DetailsTaskPorps {
  task?: ITask | null;
  onClose?: () => void;
}

const emptyTask: ITask = {
  id: null,
  title: '',
  status: TaskStatusEnum.New,
  priority: 1,
  project_id: null,
  assigned_to_id: null,
  description: '',
};

export default function DetailsTask({ task, onClose }: DetailsTaskPorps) {
  const user = useUser();
  const project = useProject();

  const initialTask = (): ITask =>
    task ?? {
      ...emptyTask,
      assigned_to_id: user?.user_id ?? null,
      project_id: project?.id ?? null,
    };

  const [localTask, setLocalTask] = useState<ITask>(initialTask);

  useEffect(() => {
    setLocalTask(initialTask());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const save = async () => {
    if (!localTask.title.trim()) {
      toaster.create({ title: 'Введите название задачи', type: 'error', duration: 3000 });
      return;
    }

    try {
      if (task?.id) {
        await updateTask(task.id, localTask);
      } else {
        await createTask(localTask);
      }

      onClose?.();
    } catch (error) {
      toaster.create({
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        title: 'Ошибка сохранения задачи',
        type: 'error',
        duration: 5000,
      });
    }
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
                  Описание
                </Text>
                <Textarea
                  variant="flushed"
                  placeholder="Описание"
                  value={localTask.description ?? ''}
                  onChange={(e) =>
                    setLocalTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <Text fontWeight="bold" textStyle="3xl">
                  Приоритет
                </Text>
                <NumberInput.Root
                  width="200px"
                  value={String(localTask.priority)}
                  onValueChange={(e) =>
                    setLocalTask((prev) => ({
                      ...prev,
                      priority: Number(e.value) || 0,
                    }))
                  }
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </div>

              <Button onClick={save}>
                {task?.id ? 'Сохранить' : 'Создать'}
              </Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
