import { Provider } from '@/components/ui/provider';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getMe, useIsAuthenticated } from '@/store/auth/useAuthStore';

export default function App() {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated]);

  return (
    <Provider>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}
