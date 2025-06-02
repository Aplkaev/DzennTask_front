import { Box, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { route } from '@/route';

const Sidebar = () => {
  const topLevelRoutes: AppRoute[] = [];

  const walk = (rts: AppRoute[]) => {
    for (const route of rts) {
      if (!route.hidden && route.label) {
        topLevelRoutes.push(route);
      }
      if (route.children) {
        walk(route.children);
      }
    }
  };

  walk(route);

  return (
    <Box w="250px" h="100vh" p={4}>
      <VStack align="stretch" spacing={3}>
        {topLevelRoutes.map((r) => (
          <Link as={RouterLink} key={r.path} to={r.path}>
            {r.label}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;