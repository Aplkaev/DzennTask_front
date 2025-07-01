import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { useProject, seletedProject } from '@/store/project/useProjectStore';

const ProjectSidebarItem = ({project}) => {
    return (
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
    )
}

export default ProjectSidebarItem;