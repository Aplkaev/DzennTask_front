import { Box, Input } from '@chakra-ui/react';
import { useState } from 'react';
interface TopbarProps {
  onSearch: (text: string) => void;
  onSubmitSearch: () => void;
}

export default function Topbar({ onSearch, onSubmitSearch }: TopbarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue); // передаем наверх
  };
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
    </Box>
  );
}
