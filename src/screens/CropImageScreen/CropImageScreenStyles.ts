import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    cropButton: {
      margin: theme.spacing(3),
      marginTop: 'auto',
    },
    quantitySlider: {
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  }),
);
