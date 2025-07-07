import { Box, VStack } from '@chakra-ui/react';
import { route, type AppRoute } from '@/route';
import ProjectSidebar from './Sidebar/ProjectSidebar';
import './style.css'
import MenuSidebar from './Sidebar/MenuSidebar';


const Sidebar = () => {
  const topLevelRoutes: AppRoute[] = [];
  const bottomLevelRoutes: AppRoute[] = [];

  const walk = (rts: AppRoute[]) => {
    for (const route of rts) {
      if (route.children) {
        walk(route.children);
      }

      if(route.hidden || !route.label) { 
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

  return (
    <Box w="250px" h="100vh" p={4}>
      <VStack align="stretch" spacing={3}>
        {/* вынести в отдельный компонент */}
        {topLevelRoutes.map((r) => (
          <MenuSidebar key={r.path} menu={r}/> 
        ))}

        <ProjectSidebar />

        {bottomLevelRoutes.map((r) => (
          <MenuSidebar key={r.path} menu={r}/> 
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;