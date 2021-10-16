import React, { useEffect, useState } from 'react';
import { Appearance, AppState, StatusBar } from 'react-native';
import { getItem, removeItem, setItem } from '../../helpers/localStorage';
import { AvailableThemes } from './models/AvailableThemes';
import { ThemeContext, ThemeContextProps } from './ThemeContext';
import { themes } from './themes';

interface Props {
  defaultTheme: AvailableThemes;
}

export const ThemeProvider: React.FC<Props> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [themeName, setThemeName] = useState<AvailableThemes>(
    Appearance.getColorScheme() || defaultTheme,
  );

  useEffect(() => {
    (async () => {
      const storedThemeName = await getItem<AvailableThemes>('theme');
      storedThemeName && setThemeName(storedThemeName);
    })();

    AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        const storedThemeName = await getItem<AvailableThemes>('theme');

        !storedThemeName &&
          setThemeName(Appearance.getColorScheme() || themeName);
      }
    });
  }, []);

  const changeTheme = (themeName: AvailableThemes) => {
    const phoneThemeName = Appearance.getColorScheme();

    setThemeName(themeName);

    phoneThemeName === themeName
      ? removeItem('theme')
      : setItem('theme', themeName);
  };

  const contextValue: ThemeContextProps = {
    themeName,
    theme: themes[themeName],
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar
        animated
        translucent
        backgroundColor="transparent"
        barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
};
