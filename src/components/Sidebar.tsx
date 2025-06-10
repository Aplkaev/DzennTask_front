import { Box, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { route, type AppRoute } from '@/route';
import { api, apiClient } from '@/shared/api/apiClient';
import { useEffect, useState } from 'react';
import { useProjects, fetchProjects, seletedProject, useProject } from '@/store/project/useProjectStore';
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


  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);



  walk(route);
  return (
    <Box w="250px" h="100vh" p={4}>
      <VStack align="stretch" spacing={3}>
        {topLevelRoutes.map((r) => (
          <div className="menu-route-main">
            <Link as={RouterLink} key={r.path} to={r.path} color={'#FFF'}>
              {r.label}
            </Link>
          </div>
        ))}
        {useProjects().map((project) => (
            <Link
              as={RouterLink}
              to={`/project/${project.id}`}
              key={project.id}
              color={'#ccc5be'}
              className={"menu-route-project " + (useProject()?.id === project.id ? 'menu-active-project' : '')}  
              onClick={() => seletedProject(project.id)}
            >
              {project.name}
            </Link>
        ))}

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