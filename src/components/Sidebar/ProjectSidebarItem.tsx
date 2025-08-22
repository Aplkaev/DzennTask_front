import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Text, Icon } from '@chakra-ui/react';
import { useProject, seletedProject } from '@/store/project/useProjectStore';

const ProjectSidebarItem = ({ project }) => {
  const currentProject = useProject();

  const isActive = currentProject?.id === project.id;

  return (
    <Button
      as={RouterLink}
      to={`/project/${project.id}`}
      onClick={() => seletedProject(project.id)}
      justifyContent="space-between"
      variant={isActive ? 'solid' : 'ghost'}
      colorScheme={isActive ? 'teal' : 'gray'}
      w="100%"
      borderRadius="lg"
      px={4}
      py={2}
    >
      <Flex align="center" gap={3}>
        <Text noOfLines={1} fontWeight={isActive ? 'bold' : 'normal'}>
          {project.name}
        </Text>
      </Flex>
    </Button>
  );
};

export default ProjectSidebarItem;
