import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Text, Icon } from '@chakra-ui/react';
import { useProject, selectedProject } from '@/store/project/useProjectStore';
import type { IProject } from '@/store/project/types';

interface ProjectSidebarItemProps {
  project: IProject;
}

const ProjectSidebarItem = ({ project }: ProjectSidebarItemProps) => {
  const currentProject = useProject();

  const isActive = currentProject?.id === project.id;
  const projectId = project.id.split('/').slice(-1)[0];
  
  return (
    <Button
      as={RouterLink}
      to={`/project/${projectId}`}
      onClick={() => selectedProject(project.id)}
      justifyContent="space-between"
      // variant={isActive ? 'solid' : 'ghost'}
      w="100%"
      borderRadius="lg"
      my={1}
      colorPalette={isActive ? 'gray' : ''}
      variant={isActive ? 'surface' : 'outline'}
    >
      <Text fontWeight={isActive ? 'bold' : 'normal'}>{project.name}</Text>
    </Button>
  );
};

export default ProjectSidebarItem;
