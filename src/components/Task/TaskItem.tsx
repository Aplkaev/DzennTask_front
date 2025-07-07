import {
  Box,
  HStack,
  Stack,
  Checkbox,
  Text,
  Button,
  Link,
  Collapsible,
} from "@chakra-ui/react";
import {
  useRemoveTask,
  useDoneTask,
  useUpdateTask,
} from "@/store/task/useTaskStore";
import DetailsTask from "./DetailsTask";
import { useState } from "react";

const TaskItem = ({ task }) => {
  const pathDatailsTask = "/project/tasks/" + task.id;
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const updateTask = async (task) => {
    console.log(task);

    if (task.status !== "done") {
      task.status = "done";
      useDoneTask(task.id);
      return;
    }
    task.status = "new";

    useUpdateTask(task.id, task);
  };

  const setDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  return (
    <Box>
      <HStack key={task.id}>
        <Stack align="flex-start">
          <Checkbox.Root defaultChecked={task.status === "done"}>
            <Checkbox.HiddenInput />-
            <Checkbox.Control onClick={() => updateTask(task)}>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>{task.label}</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
        <Box flex="1" onClick={setDetails} cursor="pointer" width={"100px"}>
          <Text flex={1} truncate>
            {task.title}
          </Text>
          <Text truncate fontSize="sm" color="gray.400">
            {task.description}
          </Text>
        </Box>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => useRemoveTask(task.id)}
        >
          Удалить
        </Button>
      </HStack>
      {isOpenDetails && (
        <DetailsTask task={task} onClose={() => setDetails()} />
      )}
    </Box>
  );
};

export default TaskItem;
