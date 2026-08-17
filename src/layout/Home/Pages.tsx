import { Box, Flex, ClientOnly, Skeleton } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import ProtectedRoute from '@/components/Project/ProtectedRoute';
import Avater from '../../features/auth/components/Avatar';
import Header from '../Header/Header';

export default function Page() {
  return (
    <Flex>
      <ProtectedRoute>
        <Header />
        <Sidebar />
        <Box flex="1">
          <Box p={4}>
            <Outlet />
          </Box>
        </Box>
      </ProtectedRoute>
    </Flex>
  );
}
