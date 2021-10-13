import React, { useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { ThemeContext, ThemeContextProps } from './ThemeContext';
import { themes } from './themes';

interface Props {
  defaultTheme: keyof typeof themes;
}

export const ThemeProvider: React.FC<Props> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [themeName, setThemeName] = useState<keyof typeof themes>(
    Appearance.getColorScheme() || defaultTheme,
  );

  const contextValue: ThemeContextProps = {
    themeName,
    theme: themes[themeName],
    changeTheme: (name) => {
      if (name in themes) setThemeName(name);
      else
        console.warn(
          `${name} is not an available theme. Using ${themeName} theme instead.`,
        );
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar
        backgroundColor={themes[themeName].palette.background[100]}
        barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
};
