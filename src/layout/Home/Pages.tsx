import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import Header from '../Header/Header';

export default function Page() {
  return (
    <ProtectedRoute>
      <Flex direction="column" minH="100vh">
        <Header />
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
    </ProtectedRoute>
  );
}
