'use client';

import { Button, Dialog, Field, Input, Portal, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toaster, Toaster } from '@/components/ui/toaster';
import { createProject } from '@/store/project/useProjectStore';

export default function NewProject() {
  const ref = useRef<HTMLInputElement>(null);
  const [nameProject, setNameProject] = useState('');
  const navigate = useNavigate();
  const save = async () => {
    try {
      await createProject(nameProject);

      toaster.create({
        title: 'Успешно создан проект!',
        type: 'success',
        duration: 5000,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);

      toaster.create({
        description:
          error instanceof Error ? error.message : 'Неизвестная ошибка',
        title: 'Ошибка создание проекта',
        type: 'error',
        duration: 5000,
      });
    }
  };
  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      open={true}
      placement={'center'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Новый проект</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Input
                    placeholder="Название"
                    value={nameProject}
                    onChange={(e) => setNameProject(e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Отменить
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => save()}>Создать</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <Toaster />
    </Dialog.Root>
  );
}
