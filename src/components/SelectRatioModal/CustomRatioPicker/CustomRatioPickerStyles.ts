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
      height: 40,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 3,
    },
    colonPoint: {
      width: 5,
      height: 5,
      borderRadius: 20,
      backgroundColor: theme.palette.primary[500],
    },
    input: {
      width: 85,
      color: theme.palette.primary[500],
      textAlign: 'center',
      fontSize: 35,
    },
    applyButton: {
      marginLeft: 'auto',
      paddingHorizontal: 14,
    },
  });
});
