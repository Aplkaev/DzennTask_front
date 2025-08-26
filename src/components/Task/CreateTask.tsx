import { Box, HStack, Input, Button, Heading } from '@chakra-ui/react';
import { useCreateTask } from '@/store/task/useTaskStore';
import { useUser } from '@/store/auth/useAuthStore';
import { useProject } from '@/store/project/useProjectStore';
import { useState } from 'react';
import DetailsTask from './DetailsTask';
import { useNewTask } from '@/store/task/useTaskStore';

const CreateTask = () => {
  const [newTaskTitle, setNewTask] = useState('');
  const newTask = useNewTask();
  const project = useProject();
  const user = useUser();
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const setDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      await useCreateTask({
        id: null,
        status: 'new',
        title: newTaskTitle,
        priority: 1,
        project_id: project?.id ?? '',
        assigned_to_id: user?.user_id ?? '',
      });
      setIsOpenDetails((prev) => !prev);
    }
  };

  return (
    <Box>
      <Heading mb={6}>Мой Таск-Менеджер</Heading>
      <HStack mb={4}>
        <Input
          placeholder="Добавить новую задачу..."
          value={newTaskTitle}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <Button variant="subtle" onClick={addTask}>
          Добавить
        </Button>
      </HStack>
      {isOpenDetails && 
        newTask && (
        <DetailsTask task={newTask} onClose={() => setDetails()} />
      )}
    </Box>
  );
};

export default CreateTask;
