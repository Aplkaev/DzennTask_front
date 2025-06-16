import { useState, useEffect, use } from "react";
import { Box, Heading, HStack, Input, Button, Stack, Checkbox, Text } from "@chakra-ui/react";
import { useProject } from "@/store/project/useProjectStore";
import { useTasks, fetchTasks, createTask } from "@/store/task/useTaskStore";
import { useUser } from "@/store/auth/useAuthStore";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Task() {
  const project = useProject();
  const tasks = useTasks();

  useEffect(() => {
    if(project !== null) { 
      fetchTasks(project.id);
      console.log(tasks);
    }
  }, [project?.id]);


  return (
    <Box p={4} appearance="light">
      <Heading mb={6}>Мой Таск-Менеджер</Heading>
      <CreateTask ></CreateTask>
      {/* вынести отображение таски в отдельный компонент 

        добавить кнопку выполнения
        селектор статуса
        селектор канбана
      */}
      <Stack align="stretch">
        {tasks.map((task) => (
          <TaskItem task={task}></TaskItem>
        ))}
      </Stack>
    </Box>
  )
}