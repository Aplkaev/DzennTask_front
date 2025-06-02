
import { Provider } from "@/components/ui/provider"
import { Theme } from '@chakra-ui/react';
import { ColorModeProvider } from "@/components/ui/color-mode"
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
      <ColorModeProvider> 
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </ColorModeProvider>
    </Provider>
  );
}