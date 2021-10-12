import React, { FC } from 'react';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useStyles } from './InfoModalStyles';

interface Props {
  title: string;
  buttonOnPress?: () => void;
  buttonText: string;
}

export const InfoModal: FC<Props> = ({
  title,
  buttonText,
  buttonOnPress = () => null,
}) => {
  const styles = useStyles();
  const modal = useModal();

  return (
    <>
      <Text variant="button" style={styles.title}>
        {title}
      </Text>
      <Button
        variant="outlined"
        color="primary"
        title={buttonText}
        onPress={() => {
          modal.handleHide();
          buttonOnPress();
        }}
      />
    </>
  );
};