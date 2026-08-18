import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProjects, selectedProject, useProject, useProjects } from './useProjectStore';

export function useProjectBootstrap() {
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useProjects();
  const currentProject = useProject();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const target = currentProject ?? projects[0];

    if (!target) {
      return;
    }

    if (!currentProject) {
      selectedProject(target.id);
    }

    const projectId = target.id.split('/').slice(-1)[0];
    navigate(`/project/${projectId}`, { replace: true });
  }, [projects, currentProject, location.pathname, navigate]);
}
