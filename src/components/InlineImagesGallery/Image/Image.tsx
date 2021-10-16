import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Asset } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { useStyles } from './ImageStyles';
import { useImagePreviewModal } from '../../../providers/ImagePreviewModal';

interface Props {
  image: Asset;
  handleSetImage: (uri: string) => void;
}

export const Image = memo<Props>(
  ({ image, handleSetImage }) => {
    const styles = useStyles();
    const imagePreviewModal = useImagePreviewModal();

    return (
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={() => handleSetImage(image.uri!)}
        onLongPress={() => imagePreviewModal.handleOpen(image.uri!)}
        onPressOut={() => imagePreviewModal.handleHide()}
      >
        <FastImage style={styles.image} source={image} />
      </TouchableOpacity>
    );
  },
  () => true,
);
