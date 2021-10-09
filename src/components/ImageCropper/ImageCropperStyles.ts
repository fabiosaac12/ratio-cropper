import { StyleSheet, useWindowDimensions } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      width: Math.min(width, height),
      height: Math.min(width, height),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    area: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
      minWidth: '100%',
      minHeight: '100%',
    },
  });
});
