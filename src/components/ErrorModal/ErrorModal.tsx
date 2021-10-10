import React, { FC } from 'react';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useStyles } from './ErrorModalStyles';

interface Props {
  title: string;
}

export const ErrorModal: FC<Props> = ({ title }) => {
  const styles = useStyles();
  const modal = useModal();

  return (
    <>
      <Text variant="button" style={styles.title}>
        {title}
      </Text>
      <Button
        variant="outlined"
        color="danger"
        title="Oh no :("
        onPress={modal.handleHide}
      />
    </>
  );
};
