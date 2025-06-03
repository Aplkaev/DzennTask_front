import { authStore } from '@/store/auth/auth';
import LoginForm from './containers/auth/LoginForm';
import RegForm from './containers/auth/RegForm';
import HomePage from './components/HomePages';
import NewProject from './components/Project/NewProject';

export type AppRoute = {
  path: string;
  label?: string; // для меню
  element: ReactNode;
  children?: AppRoute[];
  hidden?: boolean; // если не показывать в меню
};

export const route: AppRoute[] = 
[{
    path: '/',
    label: 'Главная',
    element: <HomePage />,
    children: [
      {
        path: '/project/new',
        label: 'Новый проект',
        element: <NewProject />,
      }
    ],
},
{
  path: 'login',
  element: <LoginForm />,
},
{
  path: 'register',
  element: <RegForm />,
},
];