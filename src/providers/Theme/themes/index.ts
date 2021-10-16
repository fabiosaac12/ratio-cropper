import { light } from './light';
import { dark } from './dark';
import { Themes } from '../models/Themes';
import { AvailableThemes } from '../models/AvailableThemes';

export const themes: Themes<AvailableThemes> = { light, dark };
