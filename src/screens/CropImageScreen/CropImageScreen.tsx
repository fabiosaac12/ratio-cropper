import React, { FC, useRef } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { ImageCropper } from '../../components/ImageCropper';
import { ImageCropperRef } from '../../components/ImageCropper/models/ImageCropperRef';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';
import { handleSaveImage, hasAndroidPermission } from './helpers';

export const CropImageScreen: FC = () => {
  const styles = useStyles();
  const { image, ratio } = useImageHandler();
  const imageCropperRef: ImageCropperRef = useRef();

  const handleCrop = async () => {
    if (imageCropperRef.current && (await hasAndroidPermission())) {
      const path = await imageCropperRef.current?.handleCrop();

      handleSaveImage(path);
    }
  };

  return (
    <View>
      {image?.uri && ratio && (
        <ImageCropper
          uri={image.uri}
          ratio={ratio}
          imageCropperRef={imageCropperRef}
        />
      )}
      <Button title="Crop" onPress={handleCrop} />
    </View>
  );
};
