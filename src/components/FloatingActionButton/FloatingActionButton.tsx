import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { Text } from '../Text';
import { useStyles } from './FloatingActionButtonStyles';

interface Props {
  position: 'br' | 'bl' | 'tl' | 'tr';
  onPress?: () => void;
  title: string;
}

export const FloatingActionButton = (props: Props) => {
  const styles = useStyles();
  const { position, title } = props;

  return (
    <View style={[styles.container, styles[position]]}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple('#00000020', false, 30)}
      >
        <View style={styles.fab}>
          <Text style={styles.text} variant="button">
            {title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
