import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    title: {
      color: theme.palette.text.primary,
      fontSize: 21,
    },
    title2: {
      color: theme.palette.text.secondary,
      fontSize: 19,
    },
    subtitle: {
      color: theme.palette.text.primary,
      fontSize: 17,
    },
    subtitle2: {
      color: theme.palette.text.secondary,
      fontSize: 16,
    },
    body: {
      color: theme.palette.text.primary,
      fontSize: 14,
    },
    body2: {
      color: theme.palette.text.secondary,
      fontSize: 13,
    },
    button: {
      color: theme.palette.text.button,
      fontSize: 15,
      textTransform: 'uppercase',
      fontWeight: '500',
    },
  }),
);
