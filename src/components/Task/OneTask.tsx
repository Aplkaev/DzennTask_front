import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import type { ITask } from '@/store/task/types';
import { useDoneTask, useToggleOneTaskView } from '@/store/task/useTaskStore';
import { toaster } from '../ui/toaster';

interface DetailsTaskPorps {
  task?: ITask;
  doneTask: (task: ITask) => void
}

export default function OneTask({
  task = {
    id: null,
    title: null,
    status: null,
    priority: null,
    project_id: null,
    assigned_to_id: null,
    description: null,
  },
  doneTask,
}: DetailsTaskPorps) {
  const clickDoneTask = async () => {
    doneTask(task)
  };

  const toggleOneTaskView = useToggleOneTaskView();

  return (
    <Dialog.Root size="full" motionPreset="slide-in-bottom" open={true}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{task.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{task.description}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={clickDoneTask}
                  colorPalette={'green'}
                >
                  Готово
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={toggleOneTaskView}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={toggleOneTaskView} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
