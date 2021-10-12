import { StyleSheet, useWindowDimensions } from 'react-native';
import { makeStyles } from '../../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const { width, height } = useWindowDimensions();

  const size = Math.min(width, height) / 4;

  return StyleSheet.create({
    imageWrapper: {
      ...theme.shadows[1],
      width: size,
      height: size,
      marginVertical: 2,
      marginHorizontal: 1,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      resizeMode: 'cover',
    },
  });
});
