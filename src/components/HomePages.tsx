import { Box, Flex, ClientOnly, Skeleton } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import Topbar from './Topbar/Topbar';
import ProtectedRoute from '@/containers/auth/ProtectedRoute';
import { ColorModeToggle } from './color-mode-toggle';

export default function HomePage() {
  return (
    <Flex>
      <ProtectedRoute>
        <Sidebar />
        <Box flex="1">
          <Box p={4}>
            <Outlet />
          </Box>
        </Box>
      </ProtectedRoute>
      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Flex>
  );
}
