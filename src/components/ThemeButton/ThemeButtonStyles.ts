import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    fab: {
      width: 65,
      height: 65,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background[100],
      borderColor: theme.palette.primary[500],
      borderWidth: 2,
      ...theme.shadows[4],
    },
    icon: {
      color: theme.palette.primary[500],
    },
  }),
);
