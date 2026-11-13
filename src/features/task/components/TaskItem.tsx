import { Box, HStack, Stack, Checkbox, Text, Button } from '@chakra-ui/react';
import DetailsTask from './DetailsTask';
import { useState } from 'react';
import { TaskStatusEnum } from '@/generated/graphql';
import type { ITask } from '../types';

interface TaskItemProps {
  task: ITask;
  doneTask: (task: ITask) => void;
  removeTask: (task: ITask) => void;
}

const TaskItem = ({ task, doneTask, removeTask }: TaskItemProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const setDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  return (
    <Box>
      <HStack key={task.id}>
        <Stack align="flex-start">
          <Checkbox.Root checked={task.status === TaskStatusEnum.Done}>
            <Checkbox.HiddenInput />
            <Checkbox.Control onClick={() => doneTask(task)}>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>{task.title}</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
        <Box flex="1" onClick={setDetails} cursor="pointer" width={'100px'}>
          <Text truncate fontSize="sm" color="gray.400">
            {task.description}
          </Text>
        </Box>
        {task.id !== null ? (
          <Button
            size="sm"
            variant="surface"
            colorPalette={'red'}
            onClick={() => removeTask(task)}
          >
            Удалить
          </Button>
        ) : (
          ''
        )}
      </HStack>
      {isOpenDetails && (
        <DetailsTask task={task} onClose={() => setDetails()} />
      )}
    </Box>
  );
};

export default TaskItem;
