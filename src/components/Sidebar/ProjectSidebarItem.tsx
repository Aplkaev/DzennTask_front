import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Text, Icon } from '@chakra-ui/react';
import { useProject, seletedProject } from '@/store/project/useProjectStore';
import type { IProject } from '@/store/project/types';

interface ProjectSidebarItemProps {
  project: IProject;
}

const ProjectSidebarItem = ({ project }: ProjectSidebarItemProps) => {
  const currentProject = useProject();

  const isActive = currentProject?.id === project.id;

  return (
    <Button
      as={RouterLink}
      to={`/project/${project.id}`}
      onClick={() => seletedProject(project.id)}
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
