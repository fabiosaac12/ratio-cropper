import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { ImageCropper } from '../../components/ImageCropper';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';
import { Text } from '../../components/Text';
import Slider from '@ptomasroos/react-native-multi-slider';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useModal } from '../../providers/Modal';
import { SelectRatioModal } from '../HomeScreen/SelectRatioModal';

export const CropImageScreen: FC = () => {
  const styles = useStyles();
  const { image, ratio, handleCrop, imageCropperRef } = useImageHandler();
  const modal = useModal();

  return (
    <View style={styles.container}>
      {image?.uri && ratio && (
        <ImageCropper
          uri={image.uri}
          ratio={ratio}
          imageCropperRef={imageCropperRef}
        >
          <FloatingActionButton
            position="br"
            title={`${ratio[0]} : ${ratio[1]}`}
            onPress={() => modal.handleOpen({ content: <SelectRatioModal /> })}
          />
        </ImageCropper>
      )}

      <Button style={styles.cropButton} title="Crop" onPress={handleCrop} />
    </View>
  );
};
