import React, { FC } from 'react';
import { View } from 'react-native';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';

export const CropImageScreen: FC = () => {
  const styles = useStyles();
  const { image } = useImageHandler();

  console.log(image);

  return <View />;
};
