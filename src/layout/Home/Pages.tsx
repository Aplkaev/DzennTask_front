import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import { useProjectBootstrap } from '@/features/project/useProjectBootstrap';
import Header from '../Header/Header';

function AuthenticatedShell() {
  useProjectBootstrap();

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <AuthenticatedShell />
    </ProtectedRoute>
  );
}
