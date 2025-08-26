'use client';

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Textarea,
  Input,
  NumberInput,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useUpdateTask, useCreateTask } from '@/store/task/useTaskStore';

export default function DetailsTask({ task = null, onClose }) {
  // дефолтные значения для новой задачи
  const defaultTask = {
    title: '',
    description: '',
    priority: 1,
  };

  const [localTask, setLocalTask] = useState(task ? { ...task } : defaultTask);

  useEffect(() => {
    setLocalTask(task ? { ...task } : defaultTask);
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
                Название
                <Input
                  placeholder="Название задачи"
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
                Приоритет
                <NumberInput.Root
                  width="200px"
                  value={localTask.priority}
                  onValueChange={(e) =>
                    setLocalTask((prev) => ({
                      ...prev,
                      priority: Number(e.value), // ✅ теперь сохраняется в localTask
                    }))
                  }
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
                Описание
                <Textarea
                  variant="flushed"
                  placeholder="Описание задачи"
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
