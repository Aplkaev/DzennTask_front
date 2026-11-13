import { Box, HStack, Input, Button } from '@chakra-ui/react';
import { useUser } from '@/features/auth/useAuthStore';
import { useProject } from '@/features/project/useProjectStore';
import { useState } from 'react';

interface CreateTaskProps {
  addTask: (newTaskTitle: string) => void;
}

const CreateTask = ({ addTask }: CreateTaskProps) => {
  const [newTaskTitle, setNewTask] = useState('');
  const project = useProject();
  const user = useUser();

  const handleAddTask = () => {
    if (!user || !project || !newTaskTitle.trim()) return;

    addTask(newTaskTitle);
    setNewTask('');
  };

  return user && project ? (
    <Box>
      <HStack mb={4}>
        <Input
          placeholder="Добавить новую задачу..."
          value={newTaskTitle}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button variant="subtle" onClick={handleAddTask}>
          Добавить
        </Button>
      </HStack>
    </Box>
  ) : (
    ''
  );
};

export default CreateTask;
