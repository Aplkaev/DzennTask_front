'use client';

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toaster, Toaster } from '@/components/ui/toaster';
import { useUpdateTask } from '@/store/task/useTaskStore';

export default function DetailsTask({ task, onClose }) {
  const [localTask, setLocalTask] = useState({ ...task });
  useEffect(() => {
    setLocalTask({ ...task });
  }, [task]);

  const update = async () => {
    console.log('update', localTask);

    await useUpdateTask(task.id, localTask);

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
              <Button onClick={update}>Создать</Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
