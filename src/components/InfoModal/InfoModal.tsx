import React, { FC } from 'react';
import { View } from 'react-native';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useStyles } from './InfoModalStyles';

interface Props {
  title: string;
  buttonOnPress?: () => void;
  buttonText: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const InfoModal: FC<Props> = ({
  title,
  buttonText,
  buttonOnPress = () => null,
  variant = 'primary',
}) => {
  const styles = useStyles({ variant });
  const modal = useModal();

  return (
    <View style={styles.container}>
      <Text variant="button" style={styles.title}>
        {title}
      </Text>
      <Button
        variant="outlined"
        color={variant}
        title={buttonText}
        onPress={() => {
          modal.handleHide();
          buttonOnPress();
        }}
      />
    </View>
  );
};
