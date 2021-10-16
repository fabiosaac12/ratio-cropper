import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal as RNModal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { getImageSize } from '../../helpers/getImageSize';
import { useImagePreviewModal } from '../../providers/ImagePreviewModal';
import { useStyles } from './ImagePreviewModalStyles';

export const ImagePreviewModal: React.FC = () => {
  const { handleHide, visible, uri } = useImagePreviewModal();
  const windowDimensions = useWindowDimensions();
  const [image, setImage] =
    useState<{ width: number; height: number; uri: string }>();

  useEffect(() => {
    uri &&
      (async () => {
        const { height: originalHeight, width: originalWidth } =
          await getImageSize(uri);

        let height: number;
        let width: number;

        if (originalHeight > originalWidth) {
          height = windowDimensions.width * 0.9;
          width = (originalWidth * height) / originalHeight;
        } else {
          width = windowDimensions.width * 0.9;
          height = (originalHeight * width) / originalWidth;
        }

        setImage({ width, height, uri });
      })();
  }, [uri]);

  const styles = useStyles();

  return (
    <RNModal
      statusBarTranslucent
      hardwareAccelerated
      renderToHardwareTextureAndroid
      animationType="fade"
      transparent={true}
      visible={visible && uri === image?.uri}
      onRequestClose={handleHide}
    >
      <TouchableOpacity
        onPress={handleHide}
        activeOpacity={1}
        style={styles.backdrop}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          onPress={handleHide}
        >
          <Image source={{ uri, ...image }} />
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};
