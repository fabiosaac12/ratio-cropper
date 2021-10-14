import React from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';
import { useModal } from '../../providers/Modal';
import { useStyles } from './ModalStyles';

export const Modal: React.FC = () => {
  const { handleHide, visible, content } = useModal();
  const styles = useStyles();

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleHide}
    >
      <TouchableOpacity
        onPress={handleHide}
        activeOpacity={1}
        style={styles.backdrop}
      >
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          {content}
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};
