import { Box, Button, Input, HStack } from '@chakra-ui/react';
import { toggleOneTaskView } from '@/features/task/useTaskStore';
import type { TaskStatusFilter } from '@/features/task/types';

interface TopbarProps {
  onSearch: (text: string) => void;
  onSubmitSearch: () => void;
  statusFilter: TaskStatusFilter;
  filterStatusTask: () => void;
}

export default function Topbar({
  onSearch,
  onSubmitSearch,
  statusFilter,
  filterStatusTask,
}: TopbarProps) {
  return (
    <Box p={4}>
      <Input
        placeholder="Поиск..."
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmitSearch();
          }
        }}
      />
      <HStack align="flex-start" p={4} justify="space-between">
        <Button size="sm" variant="outline" onClick={filterStatusTask}>
          {statusFilter === 'new'
            ? 'Только новые'
            : statusFilter === 'done'
              ? 'Только выполненные'
              : 'Все задачи'}
        </Button>

        <Button size="sm" onClick={toggleOneTaskView}>
          Основная задача
        </Button>
      </HStack>
    </Box>
  );
}
