import { Box, VStack, ClientOnly, Skeleton, Button } from '@chakra-ui/react';
import { route, type AppRoute } from '@/route';
import ProjectSidebar from './Sidebar/ProjectSidebar';
import './style.css';
import MenuSidebar from './Sidebar/MenuSidebar';
import { ColorModeToggle } from './color-mode-toggle';
import { useToggleOneTaskView } from '@/store/task/useTaskStore';

const Sidebar = () => {
  const topLevelRoutes: AppRoute[] = [];
  const bottomLevelRoutes: AppRoute[] = [];

  const walk = (rts: AppRoute[]) => {
    for (const route of rts) {
      if (route.children) {
        walk(route.children);
      }

      if (route.hidden || !route.label) {
        continue;
      }

      if (route.top || !route.bottom) {
        topLevelRoutes.push(route);
      }

      if (!route.top || route.bottom) {
        bottomLevelRoutes.push(route);
      }
    }
  };

  walk(route);

  const toggleOneTaskView = useToggleOneTaskView();

  return (
    <Box w="250px" h="100vh" p={4}>
      <VStack align="stretch" spacing={3}>
        {topLevelRoutes.map((r) => (
          <MenuSidebar key={r.path} menu={r} />
        ))}

        <ProjectSidebar />

        {bottomLevelRoutes.map((r) => (
          <MenuSidebar key={r.path} menu={r} />
        ))}
        <Button onClick={toggleOneTaskView}>Основная задача</Button>
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
        
      </VStack>
    </Box>
  );
};

export default Sidebar;
