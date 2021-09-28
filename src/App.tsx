import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageHandlerProvider } from './providers/ImageHandler';
import { ThemeProvider } from './providers/Theme';
import { HomeScreen } from './screens/HomeScreen';

export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider defaultTheme="light">
        <ImageHandlerProvider>
          <HomeScreen />
        </ImageHandlerProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
