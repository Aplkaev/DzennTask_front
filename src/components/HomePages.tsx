import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import LoginForm from "../containers/auth/LoginForm";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Купить продукты", completed: false },
    { id: 2, text: "Сделать домашку", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box p={4} appearance="light">
      <LoginForm></LoginForm>
      {/* <Heading mb={6}>Мой Таск-Менеджер</Heading>
      <HStack mb={4}>
        <Input
          placeholder="Добавить новую задачу..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button colorScheme="teal" onClick={addTask}>
          Добавить
        </Button>
      </HStack>
      <Stack align="stretch">
        {tasks.map((task) => (
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
              as={task.completed ? "s" : "p"}
              textDecoration={task.completed ? "line-through" : "none"}
            >
              {task.text}
            </Text>
            <Button 
              size="sm" 
              colorScheme="red" 
              onClick={() => deleteTask(task.id)}
            >
              Удалить
            </Button>
          </HStack>
        ))}
      </Stack> */}
    </Box>
  )
}