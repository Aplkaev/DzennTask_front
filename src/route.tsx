import LoginForm from './features/auth/components/LoginForm';
import RegForm from './features/auth/components/RegForm';
import Page from './layout/Home/Pages';
import NewProject from './components/Project/NewProject';
import Logout from './features/auth/components/Logout';
import Task from './features/task/components/TaskList';
import DatilsTask from './features/task/components/DetailsTask';
import type { ReactNode } from 'react';

export type AppRoute = {
  path: string;
  label?: string; // для меню
  element: ReactNode;
  children?: AppRoute[];
  hidden?: boolean; // если не показывать в меню,
  top?: boolean;
  bottom?: boolean;
};

export const route: AppRoute[] = [
  {
    path: 'login',
    element: <LoginForm />,
  },
  {
    path: 'register',
    element: <RegForm />,
  },
  {
    path: 'logout',
    label: 'Выйти',
    element: <Logout />,
    bottom: true,
  },
  {
    path: '/',
    label: 'Главная',
    hidden: true,
    element: <Page />,
    top: true,
    children: [
      {
        path: 'project/new',
        label: 'Новый проект',
        top: true,
        element: <NewProject />,
      },
      {
        path: 'project/:uuid',
        element: <Task />,
      },
      // создать новый таску
      {
        path: 'project/tasks/new',
        element: <DatilsTask />,
      },
      {
        path: 'project/tasks/:uuid',
        element: <DatilsTask />,
      },
    ],
  },
];
