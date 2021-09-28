import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from './providers/Theme';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <View></View>
    </ThemeProvider>
  );
};
