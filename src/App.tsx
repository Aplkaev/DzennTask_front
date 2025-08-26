import { Provider } from '@/components/ui/provider';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}
