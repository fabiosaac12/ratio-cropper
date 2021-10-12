import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    layout: {
      flex: 1,
    },
  });
});
