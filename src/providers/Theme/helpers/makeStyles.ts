import { useTheme } from '../useTheme';
import { Theme } from '../models/Theme';

export const makeStyles =
  <T, I>(generateStyles: (theme: Theme, params?: I) => T) =>
  (params?: I) => {
    const { theme } = useTheme();

    return generateStyles(theme, params);
  };
