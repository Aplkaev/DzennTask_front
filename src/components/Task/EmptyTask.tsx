import { VStack, Text } from '@chakra-ui/react';
export default function EmptyTask({ message = 'Задач пока нет' }) {
  return (
    <VStack
      w="100%"
      h="200px"
      align="center"
      justify="center"
      spacing={4}
      border="2px dashed"
      borderColor="gray.200"
      borderRadius="xl"
    >
      <Text fontSize="lg" color="gray.500" fontWeight="medium">
        {message}
      </Text>
    </VStack>
  );
}
