import { Box, HStack, Input, Button, Heading } from "@chakra-ui/react";
import { createTask } from "@/store/task/useTaskStore";
import { useUser } from "@/store/auth/useAuthStore";
import { useProject } from "@/store/project/useProjectStore";
import { useState } from "react";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");
  const project = useProject();
  const user = useUser();

  const addTask = async () => {
    if (newTask.trim()) {
      await createTask({
        id: null,
        status: "new",
        title: newTask,
        priority: 1,
        project_id: project?.id ?? "",
        assigned_to_id: user?.user_id ?? "",
      });
    }
  };

  return (
    <Box>
        <Heading mb={6}>Мой Таск-Менеджер</Heading>
      <HStack mb={4}>
        <Input
          placeholder="Добавить новую задачу..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button variant="subtle" onClick={addTask}>Добавить</Button>
      </HStack>
    </Box>
  );
};

export default CreateTask;
