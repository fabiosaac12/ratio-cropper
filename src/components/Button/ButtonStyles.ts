import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    button: {
      padding: theme.spacing(1.3),
      borderRadius: theme.radius(5),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(),
      ...theme.shadows[2],
    },
    primary: {
      backgroundColor: theme.palette.primary[500],
    },
    secondary: {
      backgroundColor: theme.palette.secondary[500],
    },
    disabled: {
      backgroundColor: theme.palette.greys[500],
    },
  }),
);
