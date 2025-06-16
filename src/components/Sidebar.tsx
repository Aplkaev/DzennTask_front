import { Box, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { route, type AppRoute } from '@/route';
import ProjectSidebar from './Sidebar/ProjectSidebar';
import './style.css'


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
          <div className="menu-route-main">
            <Link as={RouterLink} key={r.path} to={r.path} color={'#FFF'}>
              {r.label}
            </Link>
          </div>
        ))}

        <ProjectSidebar />

        {bottomLevelRoutes.map((r) => (
          <div className="menu-route-main">
            <Link as={RouterLink} key={r.path} to={r.path} color={'#FFF'}>
              {r.label}
            </Link>
          </div>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;