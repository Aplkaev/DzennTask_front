import { useEffect } from 'react';
import { useProjects, fetchProjects, seletedProject, useProject } from '@/store/project/useProjectStore';
import { Box, VStack, Link } from '@chakra-ui/react';
import ProjectSidebarItem from './ProjectSidebarItem';

const ProjectSidebar = () => { 
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  return (
    <Box>
        {useProjects().map((project) => (
          <ProjectSidebarItem project={project}></ProjectSidebarItem>
    ))}
    </Box>
  )
}

export default ProjectSidebar;