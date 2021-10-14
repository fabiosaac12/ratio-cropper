import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(3),
    },
    title: {
      textAlign: 'center',
      color:
        theme.name === 'light'
          ? theme.palette.primary[800]
          : theme.palette.primary[200],
      marginBottom: 15,
    },
  }),
);
