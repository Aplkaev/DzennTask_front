import { Box, Stack } from '@chakra-ui/react';
import { useProject } from '@/store/project/useProjectStore';
import { useUser } from '@/store/auth/useAuthStore';
import Topbar from '../Topbar/Topbar';
import CreateTask from './CreateTask';
import TaskItem from './TaskItem';
import OneTask from './OneTask';
import EmptyTask from './EmptyTask';
import DetailsTask from './DetailsTask';
import { useTaskList } from './useTastList';

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
    maxPriorityTask,
    addTask,
    doneTask,
    loadTasks,
  } = useTaskList(project, user);

  return tasks.length > 0 ? (
    <Box p={4} className="task-view">
      {maxPriorityTask && <OneTask task={maxPriorityTask} doneTask={doneTask} />}

      <Topbar
        onSearch={setTextFilter}
        onSubmitSearch={() => loadTasks(textFilter)}
        filterStatusTask={toggleStatusFilter}
        statusFilter={statusFilter}
      />

      <hr />

      <Stack align="stretch" p={4}>
        <Stack align="stretch" ref={taskContainerRef}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} doneTask={doneTask} />
          ))}
        </Stack>
      </Stack>

      <CreateTask addTask={(title) => addTask(title)} />
    </Box>
  ) : (
    <Box>
      {isOpenDetails && <DetailsTask onClose={() => setIsOpenDetails(false)} />}
      <EmptyTask
        clickCreate={() => setIsOpenDetails(true)}
        title="Задач нет"
        buttonCreateTitle="Создать задачу"
      />
    </Box>
  );
}