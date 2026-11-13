import { Box, Stack } from '@chakra-ui/react';
import { useProject } from '@/features/project/useProjectStore';
import { useUser } from '@/features/auth/useAuthStore';
import Topbar from '@/layout/Topbar/Topbar';
import CreateTask from './CreateTask';
import TaskItem from './TaskItem';
import OneTask from './OneTask';
import EmptyTask from './EmptyTask';
import DetailsTask from './DetailsTask';
import { useTaskList } from './useTaskList';

export default function TaskList() {
  
  const project = useProject();
  const user = useUser();

  const {
    tasks,
    taskContainerRef,
    textFilter,
    setTextFilter,
    statusFilter,
    toggleStatusFilter,
    isOpenDetails,
    setIsOpenDetails,
    focusTask,
    isOneTaskView,
    addTask,
    doneTask,
    removeTask,
    loadTasks,
  } = useTaskList(project, user);

  // Поиск и фильтр показываем всегда: иначе пустой результат поиска их прячет
  const isFiltered = statusFilter !== 'new' || textFilter !== '';

  return (
    <Box p={4} className="task-view">
      {isOneTaskView && focusTask && (
        <OneTask task={focusTask} doneTask={doneTask} />
      )}
      {(tasks.length > 0 || isFiltered) && (
        <>
          <Topbar
            onSearch={setTextFilter}
            onSubmitSearch={() => loadTasks(textFilter)}
            filterStatusTask={toggleStatusFilter}
            statusFilter={statusFilter}
          />
          <hr />
        </>
      )}

      {tasks.length > 0 ? (
        <>
          <Stack align="stretch" p={4}>
            <Stack align="stretch" ref={taskContainerRef}>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  doneTask={doneTask}
                  removeTask={removeTask}
                />
              ))}
            </Stack>
          </Stack>

          <CreateTask addTask={addTask} />
        </>
      ) : (
        <Box>
          {isOpenDetails && (
            <DetailsTask onClose={() => setIsOpenDetails(false)} />
          )}
          <EmptyTask
            clickCreate={() => setIsOpenDetails(true)}
            title={isFiltered ? 'Ничего не найдено' : 'Задач нет'}
            buttonCreateTitle="Создать задачу"
          />
        </Box>
      )}
    </Box>
  );
}