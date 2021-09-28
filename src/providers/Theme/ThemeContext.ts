import { createContext } from 'react';
import { Theme } from './models/Theme';
import { themes } from './themes';

export interface ThemeContextProps {
  themeName: keyof typeof themes;
  theme: Theme;
  changeTheme: (name: keyof typeof themes) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);
