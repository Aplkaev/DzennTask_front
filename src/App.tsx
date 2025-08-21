import { Provider } from '@/components/ui/provider';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const init = async () => {
      console.log('user effect load app');
    };
    init();
  }, []);
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}
