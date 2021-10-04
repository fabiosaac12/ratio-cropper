import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from './navigation/MainStackNavigator';
import { ImageHandlerProvider } from './providers/ImageHandler';
import { ThemeProvider } from './providers/Theme';

export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider defaultTheme="light">
        <ImageHandlerProvider>
          <MainStackNavigator />
        </ImageHandlerProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
