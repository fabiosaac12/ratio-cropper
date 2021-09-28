import { light } from './light';
import { dark } from './dark';
import { Theme } from '../models/Theme';
import { Themes } from '../models/Themes';

export const themes: Themes = { light, dark };

export const addTheme = (name: string, theme: Theme) => (themes[name] = theme);
