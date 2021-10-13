import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from './navigation/MainStackNavigator';
import { ImageHandlerProvider } from './providers/ImageHandler';
import { ModalProvider } from './providers/Modal';
import { PermissionsProvider } from './providers/Permissions';
import { ThemeProvider } from './providers/Theme';

export const App = () => {
  return (
    <SafeAreaProvider>
      <PermissionsProvider>
        <ThemeProvider defaultTheme="light">
          <ModalProvider>
            <ImageHandlerProvider>
              <MainStackNavigator />
            </ImageHandlerProvider>
          </ModalProvider>
        </ThemeProvider>
      </PermissionsProvider>
    </SafeAreaProvider>
  );
};
