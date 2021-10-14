import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    fab: {
      width: 55,
      height: 55,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background[100],
      borderColor: theme.palette.primary[500],
      borderWidth: 2,
      ...theme.shadows[2],
    },
    icon: {
      color: theme.palette.primary[500],
    },
  }),
);
