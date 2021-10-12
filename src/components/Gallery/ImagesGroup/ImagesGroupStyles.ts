import { StyleSheet, useWindowDimensions } from 'react-native';
import { makeStyles } from '../../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const { width, height } = useWindowDimensions();

  const size = Math.min(width, height) / 3 - 3.333;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    imageWrapper: {
      ...theme.shadows[1],
      width: size,
      height: size,
      marginLeft: 2,
      marginRight: 1.333,
      marginVertical: 1.665,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
  });
});
