import { Box, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { route, type AppRoute } from '@/route';
import { api, apiClient } from '@/shared/api/apiClient';
import { useEffect, useState } from 'react';
import { useProjects, fetchProjects } from '@/store/project/useProjectStore';


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


  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);



  walk(route);
  return (
    <Box w="250px" h="100vh" p={4}>
      <VStack align="stretch" spacing={3}>
        {topLevelRoutes.map((r) => (
          <Link as={RouterLink} key={r.path} to={r.path}>
            {r.label}
          </Link>
        ))}
        {useProjects().map((project) => (
          <Link
            as={RouterLink}
            to={`/project/${project.id}`}
            key={project.id}
          >
            {project.name}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;