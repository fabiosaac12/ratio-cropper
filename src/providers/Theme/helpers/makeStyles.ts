import { useTheme } from '../useTheme';
import { Theme } from '../models/Theme';

export const makeStyles =
  <T>(generateStyles: (theme: Theme) => T) =>
  () => {
    const { theme } = useTheme();

    return generateStyles(theme);
  };
