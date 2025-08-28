import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import type { ITask } from '@/store/task/types';
import { useDoneTask, useToggleOneTaskView } from '@/store/task/useTaskStore';

interface DetailsTaskPorps {
  task?: ITask;
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
}: DetailsTaskPorps) {
  const clickDoneTask = async () => {
    if (task.id) {
      useDoneTask(task.id);
    }
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
