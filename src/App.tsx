import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from './navigation/MainStackNavigator';
import { ImageHandlerProvider } from './providers/ImageHandler';
import { ModalProvider } from './providers/Modal';
import { PermissionsProvider } from './providers/Permissions';
import { ThemeProvider } from './providers/Theme';
import SplashScreen from 'react-native-splash-screen';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
