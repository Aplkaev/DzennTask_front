import { Box, HStack, Input, Button, Heading } from '@chakra-ui/react';
import { useCreateTask } from '../useTaskStore';
import { useUser } from '@/features/auth/useAuthStore';
import { useProject } from '@/features/project/useProjectStore';
import { useState } from 'react';
import DetailsTask from './DetailsTask';
import type { IUser } from '@/features/auth/types';
import type { IProject } from '@/features/project/types';

interface CreateTaskProps {
  addTask: (newTaskTitle: string, user:IUser, project: IProject) => void
}

const CreateTask = ({addTask}:CreateTaskProps) => {
  const [newTaskTitle, setNewTask] = useState('');
  const project = useProject();
  const user = useUser();


  const handleAddTask = () => {
    if (!user || !project) return;

    addTask(newTaskTitle, user, project);
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
      {/* {isOpenDetails && 
        newTask && (
        <DetailsTask task={newTask} onClose={() => setDetails()} />
      )} */}
    </Box>
  ) : '';
};

export default CreateTask;
