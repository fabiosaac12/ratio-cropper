import React from 'react';
import {
  StyleProp,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../providers/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStyles } from './ThemeButtonStyles';
import { FC } from 'react';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const ThemeButton: FC<Props> = ({ style }) => {
  const styles = useStyles();
  const { changeTheme, themeName } = useTheme();

  return (
    <View style={style}>
      <TouchableNativeFeedback
        onPress={() => changeTheme(themeName === 'dark' ? 'light' : 'dark')}
        background={TouchableNativeFeedback.Ripple('#00000020', false, 30)}
      >
        <View style={styles.fab}>
          <Icon
            size={30}
            name={themeName === 'dark' ? 'moon' : 'sunny'}
            style={styles.icon}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
