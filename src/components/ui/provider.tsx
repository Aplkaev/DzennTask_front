'use client';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import { ThemeProvider } from 'next-themes';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ColorModeProvider {...props} />
      </ThemeProvider>
    </ChakraProvider>
  );
}
