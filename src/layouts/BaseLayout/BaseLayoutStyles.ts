import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    layout: {
      flex: 1,
      paddingBottom: 57,
      paddingLeft: insets.left + theme.spacing(2),
      paddingRight: insets.right + theme.spacing(2),
    },
  });
});
