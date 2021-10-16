import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { useStyles } from './ImagesGroupStyles';
import FastImage from 'react-native-fast-image';
import { useImagePreviewModal } from '../../../providers/ImagePreviewModal';

interface Props {
  groupIndex: number;
  images: Asset[];
  handleSetImage: (uri: string) => void;
}

export const ImagesGroup = memo<Props>(
  ({ groupIndex, handleSetImage, images }) => {
    const styles = useStyles();
    const imagePreviewModal = useImagePreviewModal();

    return (
      <View style={styles.container}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={`${groupIndex}.${index}-gallery-image`}
            style={styles.imageWrapper}
            onPress={() => handleSetImage(image.uri!)}
            onLongPress={() => imagePreviewModal.handleOpen(image.uri!)}
            onPressOut={() => imagePreviewModal.handleHide()}
          >
            <FastImage style={styles.image} source={image} />
          </TouchableOpacity>
        ))}
      </View>
    );
  },
  (prevProps, nextProps) =>
    !prevProps.images.some(
      ({ uri }, index) => uri !== nextProps.images[index]?.uri,
    ),
);
