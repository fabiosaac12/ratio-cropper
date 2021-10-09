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
    qualityLabel: {
      color: theme.palette.primary[500],
      fontWeight: '500',
    },
    qualitySliderSelected: {
      height: 3,
      backgroundColor: theme.palette.primary[500],
    },
    qualitySliderMarker: {
      height: 15,
      width: 15,
      backgroundColor: theme.palette.primary[500],
      marginTop: 2,
    },
  }),
);
