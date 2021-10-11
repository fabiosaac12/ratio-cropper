import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStyles } from './FloatingActionIconButtonStyles';

interface Props {
  iconName: string;
  position: 'br' | 'bl' | 'tl' | 'tr';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  variant?: 'outlined' | 'filled';
  onPress: () => void;
}

export const FloatingActionIconButton = (props: Props) => {
  const {
    position,
    iconName,
    onPress,
    color = 'primary',
    variant = 'filled',
  } = props;

  const styles = useStyles({ variant, color, position });

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#00000020', false, 30)}
      >
        <View style={styles.fab}>
          <Icon size={32} name={iconName} style={styles.icon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
