"use client"

import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function NewProject () {
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const save = () => { 

  }
  return (
    <Dialog.Root initialFocusEl={() => ref.current} open={true} placement={'center'}>
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
                  <Input placeholder="Название" />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => navigate(-1)}>Отменить</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => save()}>Создать</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}