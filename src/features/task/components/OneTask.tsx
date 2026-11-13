import { Button, CloseButton, Dialog, Portal, Box } from '@chakra-ui/react';
import type { ITask } from '../types';
import { toggleOneTaskView } from '../useTaskStore';

interface OneTaskProps {
  task: ITask;
  doneTask: (task: ITask) => Promise<void>;
}

export default function OneTask({ task, doneTask }: OneTaskProps) {
  const clickDoneTask = async () => {
    // doneTask сам подтягивает следующую основную задачу
    await doneTask(task);
    toggleOneTaskView();
  };

  return (
    <Dialog.Root size="full" motionPreset="slide-in-bottom" open={true}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title></Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box maxW="800px" w="90%" mx="auto" py={4}>
                <Box mb={4} fontWeight="bold" fontSize="xl">
                  {task.title}
                </Box>
                <Box fontSize="md">{task.description}</Box>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={clickDoneTask}
                  colorPalette="green"
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
