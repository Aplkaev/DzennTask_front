import LoginForm from './containers/auth/LoginForm';
import RegForm from './containers/auth/RegForm';
import HomePage from './components/HomePages';
import NewProject from './components/Project/NewProject';
import Logout from './containers/auth/Logout';
import Task from './components/Task/TaskList';
import DatilsTask from './components/Task/DetailsTask';
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
    element: <HomePage />,
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
