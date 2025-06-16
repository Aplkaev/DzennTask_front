import { Box, HStack, Stack, Checkbox, Text, Button } from "@chakra-ui/react";
const TaskItem = ({task}) => {
    const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
    };

    const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Box>
            <HStack key={task.id}>
                <Stack align="flex-start">
                <Checkbox.Root
                >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                    <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Weekdays</Checkbox.Label>
                </Checkbox.Root>
            </Stack>
            <Text 
              flex={1} 
              // as={task.completed ? "s" : "p"}
              // textDecoration={task.completed ? "line-through" : "none"}
            >
              {task.title}
            </Text>
            <Button 
              size="sm" 
              colorScheme="red" 
              // onClick={() => deleteTask(task.id)}
            >
              Удалить
            </Button>
          </HStack>
        </Box>
    );
}

export default TaskItem;