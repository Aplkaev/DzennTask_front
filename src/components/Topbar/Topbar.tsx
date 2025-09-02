import { Box, Input, Checkbox, Stack } from '@chakra-ui/react';
import { useState } from 'react';

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
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue); // передаем наверх
  };
  
  return (
    <Box p={4}>
      {/* <Sidebar></Sidebar>
      <AvatarUser></AvatarUser> */}
      <Input
        placeholder="Поиск..."
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmitSearch();
          }
        }}
      />
      <Stack align="flex-start" p={4}>
        <Checkbox.Root checked={statusFilter !== 'new'}>
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
        </Checkbox.Root>
      </Stack>
    </Box>
  );
}
