import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Popover,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown, LuPencil, LuPlus, LuTrash2 } from 'react-icons/lu';
import { toaster } from '@/components/ui/toaster';
import {
  useProjects,
  useProject,
  fetchProjects,
  selectedProject,
  removeProject,
  editProject,
} from '../useProjectStore';
import type { IProject } from '../types';

export default function ProjectSwitcher() {
  const navigate = useNavigate();
  const projects = useProjects();
  const currentProject = useProject();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((project) => project.name.toLowerCase().includes(q));
  }, [projects, query]);

  const goToProject = (project: IProject) => {
    const projectId = project.id.split('/').slice(-1)[0];
    selectedProject(project.id);
    navigate(`/project/${projectId}`);
    setOpen(false);
  };

  const startRename = (project: IProject) => {
    setEditingId(project.id);
    setEditValue(project.name);
  };

  const saveRename = async (project: IProject) => {
    const name = editValue.trim();
    setEditingId(null);

    if (!name || name === project.name) {
      return;
    }

    try {
      await editProject(project.id, name);
    } catch (error) {
      toaster.create({
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        title: 'Не удалось переименовать проект',
        type: 'error',
        duration: 5000,
      });
    }
  };

  const handleDelete = async (project: IProject) => {
    if (!window.confirm(`Удалить проект «${project.name}»? Это действие необратимо.`)) {
      return;
    }

    try {
      await removeProject(project.id);
    } catch (error) {
      toaster.create({
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        title: 'Не удалось удалить проект',
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{ placement: 'bottom-start' }}
    >
      <Popover.Trigger asChild>
        <Button variant="ghost">
          <Text maxW="200px" truncate>
            {currentProject?.name ?? 'Выбрать проект'}
          </Text>
          <LuChevronDown />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="320px">
            <Popover.Body>
              <Input
                placeholder="Поиск проекта..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                mb={2}
              />

              <Stack gap={0} maxH="300px" overflowY="auto">
                {filtered.length === 0 && (
                  <Text fontSize="sm" color="gray.500" py={2}>
                    Ничего не найдено
                  </Text>
                )}

                {filtered.map((project) => {
                  const isActive = currentProject?.id === project.id;

                  return (
                    <HStack key={project.id} role="group" gap={1}>
                      {editingId === project.id ? (
                        <Input
                          size="sm"
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => saveRename(project)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveRename(project);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                      ) : (
                        <Button
                          flex="1"
                          justifyContent="flex-start"
                          size="sm"
                          variant={isActive ? 'surface' : 'ghost'}
                          fontWeight={isActive ? 'bold' : 'normal'}
                          onClick={() => goToProject(project)}
                        >
                          <Text truncate>{project.name}</Text>
                        </Button>
                      )}

                      <Box opacity={0} _groupHover={{ opacity: 1 }}>
                        <IconButton
                          aria-label="Переименовать"
                          size="xs"
                          variant="ghost"
                          onClick={() => startRename(project)}
                        >
                          <LuPencil />
                        </IconButton>
                      </Box>
                      <Box opacity={0} _groupHover={{ opacity: 1 }}>
                        <IconButton
                          aria-label="Удалить"
                          size="xs"
                          variant="ghost"
                          colorPalette="red"
                          onClick={() => handleDelete(project)}
                        >
                          <LuTrash2 />
                        </IconButton>
                      </Box>
                    </HStack>
                  );
                })}
              </Stack>

              <Separator my={2} />

              <Button
                w="100%"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  navigate('/project/new');
                }}
              >
                <LuPlus /> Новый проект
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
