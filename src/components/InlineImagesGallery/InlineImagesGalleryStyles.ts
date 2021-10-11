import { StyleSheet, useWindowDimensions } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const { width, height } = useWindowDimensions();

  const size = Math.min(width, height) / 4;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    imageWrapper: {
      ...theme.shadows[1],
      width: size,
      height: size,
      margin: 0.5,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      resizeMode: 'cover',
    },
    button: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0.5,
      borderColor: theme.palette.primary[500],
      borderRadius: 5,
      backgroundColor: theme.palette.background[200],
      ...theme.shadows[1],
    },
    buttonIcon: {
      fontSize: size / 2,
      color: theme.palette.primary[500],
    },
  });
});
