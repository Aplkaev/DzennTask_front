import { Box, Button, Input, Checkbox, HStack } from '@chakra-ui/react';
import { useToggleOneTaskView } from '@/features/task/useTaskStore';

interface TopbarProps {
  onSearch: (text: string) => void;
  onSubmitSearch: () => void;
  statusFilter: string;
  filterStatusTask: () => void;
}

export default function Topbar({
  onSearch,
  onSubmitSearch,
  statusFilter,
  filterStatusTask,
}: TopbarProps) {
  const toggleOneTaskView = useToggleOneTaskView();

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
        {/* <Checkbox.Root checked={statusFilter !== 'new'}>
          <Checkbox.HiddenInput />
          <Checkbox.Control onClick={filterStatusTask}>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>
            {statusFilter === 'new'
              ? 'Только новые'
              : statusFilter === 'done'
                ? 'Только выполненные'
                : 'Все задачи'}
          </Checkbox.Label>
        </Checkbox.Root> */}

        <Button size="sm" onClick={toggleOneTaskView}>
          Основная задача
        </Button>
      </HStack>
    </Box>
  );
}
