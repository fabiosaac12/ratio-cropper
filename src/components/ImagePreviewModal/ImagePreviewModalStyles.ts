import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
      overflow: 'hidden',
      borderRadius: 16,
      maxWidth: '90%',
      maxHeight: '90%',
      ...theme.shadows[2],
    },
  }),
);
