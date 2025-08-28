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

interface DetailsTaskPorps {
  task?: ITask;
  onClose: () => void;
}

export default function DetailsTask({
  task = {
    id: null,
    title: null,
    status: null,
    priority: null,
    project_id: null,
    assigned_to_id: null,
    description: null,
  },
  onClose,
}: DetailsTaskPorps) {
  // дефолтные значения для новой задачи
  const [localTask, setLocalTask] = useState<ITask>(task);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const update = async () => {
    console.log('save', localTask);

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
                  Название
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
              </Dialog.Title >
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
                  value={task.description}
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
