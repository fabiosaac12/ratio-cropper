import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    title: {
      textAlign: 'center',
      color: theme.palette.primary[800],
      marginBottom: 15,
    },
  }),
);
