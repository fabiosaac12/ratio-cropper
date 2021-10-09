import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 3,
    },
    br: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    bl: {
      bottom: 25,
      left: 25,
    },
    tr: {
      top: 60 + theme.spacing(2),
      right: theme.spacing(2),
    },
    tl: {
      top: 25,
      left: 25,
    },
    fab: {
      height: 45,
      paddingHorizontal: 12,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.primary[600],
      ...theme.shadows[4],
    },
    text: {
      fontWeight: '500',
    },
  }),
);
