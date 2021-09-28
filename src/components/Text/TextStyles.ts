import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    title: {
      color: theme.palette.text.primary,
      fontSize: 22,
    },
    title2: {
      color: theme.palette.text.secondary,
      fontSize: 20,
    },
    subtitle: {
      color: theme.palette.text.primary,
      fontSize: 18,
    },
    subtitle2: {
      color: theme.palette.text.secondary,
      fontSize: 17,
    },
    body: {
      color: theme.palette.text.primary,
      fontSize: 15,
    },
    body2: {
      color: theme.palette.text.secondary,
      fontSize: 14,
    },
    button: {
      color: theme.palette.text.button,
      fontSize: 16,
    },
  }),
);
