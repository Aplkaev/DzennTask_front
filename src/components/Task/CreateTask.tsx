import { Box, HStack, Input, Button, Heading } from '@chakra-ui/react';
import { useCreateTask } from '@/store/task/useTaskStore';
import { useUser } from '@/store/auth/useAuthStore';
import { useProject } from '@/store/project/useProjectStore';
import { useState } from 'react';
import DetailsTask from './DetailsTask';
import type { IUser } from '@/store/auth/types';
import type { IProject } from '@/store/project/types';

interface CreateTaskProps {
  addTask: (newTaskTitle: string, user:IUser, project: IProject) => void
}

const CreateTask = ({addTask}:CreateTaskProps) => {
  const [newTaskTitle, setNewTask] = useState('');
  const project = useProject();
  const user = useUser();


  return user && project ? (
    <Box>
      <HStack mb={4}>
        <Input
          placeholder="Добавить новую задачу..."
          value={newTaskTitle}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask(newTaskTitle, user, project)}
        />
        <Button variant="subtle" onClick={() => addTask(newTaskTitle, user, project)}>
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
