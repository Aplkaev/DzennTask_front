
import HomePage from '@/components/HomePages';
import { Provider } from "@/components/ui/provider"
import { Theme } from '@chakra-ui/react';
import { ColorModeProvider } from "@/components/ui/color-mode"

export default function App() {
  return (
    <Provider>
      <ColorModeProvider> 
        <Theme>
          <HomePage />
        </Theme>
      </ColorModeProvider>

      {/* <Theme appearance="light"> */}
        
      {/* </Theme> */}
    </Provider>
  );
}