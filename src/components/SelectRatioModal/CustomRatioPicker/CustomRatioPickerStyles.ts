import { StyleSheet, useWindowDimensions } from 'react-native';
import { makeStyles } from '../../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const windowDimensions = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    colon: {
      height: 50,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 3,
    },
    colonPoint: {
      width: 7,
      height: 7,
      borderRadius: 20,
      backgroundColor: theme.palette.primary[500],
    },
    input: {
      width: 100,
      color: theme.palette.primary[500],
      textAlign: 'center',
      fontSize: 40,
    },
    applyButton: {
      marginLeft: 'auto',
      paddingHorizontal: 14,
    },
  });
});
