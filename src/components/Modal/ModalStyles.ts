import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
      backgroundColor: theme.palette.background[200],
      borderRadius: 32,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: '100%',
      maxHeight: '90%',
      padding: theme.spacing(3),
      ...theme.shadows[2],
    },
  }),
);
