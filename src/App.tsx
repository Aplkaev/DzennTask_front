import { Provider } from '@/components/ui/provider';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Toaster } from '@/components/ui/toaster';
import { useAuthBootstrap } from '@/features/auth/useAuthBootstrap';

export default function App() {
  useAuthBootstrap();

  return (
    <Provider>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}
