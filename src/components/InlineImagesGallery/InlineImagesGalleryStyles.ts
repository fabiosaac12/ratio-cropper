import { StyleSheet, useWindowDimensions } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const { width, height } = useWindowDimensions();

  const size = Math.min(width, height) / 4;

  return StyleSheet.create({
    flatList: {
      flexGrow: 0,
    },
    button: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
      marginHorizontal: 1,
      borderRadius: 5,
      backgroundColor: theme.palette.background[200],
      ...theme.shadows[1],
    },
    buttonIcon: {
      fontSize: size / 2,
      color: theme.palette.secondary[500],
    },
  });
});
