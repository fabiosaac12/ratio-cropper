import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from './navigation/MainStackNavigator';
import { ImageHandlerProvider } from './providers/ImageHandler';
import { ModalProvider } from './providers/Modal';
import { PermissionsProvider } from './providers/Permissions';
import { ThemeProvider } from './providers/Theme';
import SplashScreen from 'react-native-splash-screen';
import { LoaderProvider } from './providers/Loader';
import { LanguageProvider } from './providers/LanguageProvider';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider defaultLanguage="en">
        <LoaderProvider>
          <PermissionsProvider>
            <ThemeProvider defaultTheme="light">
              <ModalProvider>
                <ImageHandlerProvider>
                  <MainStackNavigator />
                </ImageHandlerProvider>
              </ModalProvider>
            </ThemeProvider>
          </PermissionsProvider>
        </LoaderProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
};
