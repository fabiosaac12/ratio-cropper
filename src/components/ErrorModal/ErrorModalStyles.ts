import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    title: {
      textAlign: 'center',
      color: theme.palette.danger[500],
      marginBottom: 15,
    },
  }),
);
