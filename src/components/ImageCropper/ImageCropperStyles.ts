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
    verticalArea: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    verticalAreaLine: {
      height: '100%',
      width: 2,
      backgroundColor: `${theme.palette.primary[500]}80`,
    },
    horizontalArea: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    horizontalAreaLine: {
      width: '100%',
      height: 2,
      backgroundColor: `${theme.palette.primary[500]}80`,
    },
  });
});
