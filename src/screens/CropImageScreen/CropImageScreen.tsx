import React, { FC, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';
// @ts-ignore: Non-existent declaration file for the module react-native-imageedit
import ImageEdit from 'react-native-imageedit';
import { handleSaveImage } from './helpers';
import { ImageEditLibraryImageInfo } from './models/ImageEditLibraryImageinfo';

export const CropImageScreen: FC = () => {
  const styles = useStyles();
  const { image, ratio } = useImageHandler();
  const window = useWindowDimensions();
  const [cropAreaDimensions, setCropAreaDimensions] = useState({
    height: window.height,
    width: window.width,
  });

  useEffect(() => {
    if (image && ratio) {
      const unit = window.width / Math.max(...ratio);

      const cropAreaHeight = unit * ratio[0];
      const cropAreaWidth = unit * ratio[1];

      setCropAreaDimensions({
        width: cropAreaWidth,
        height: cropAreaHeight,
      });
    }
  }, [image, ratio]);

  return (
    <View>
      <ImageEdit
        scaled={true}
        {...cropAreaDimensions}
        image={image?.uri}
        onSave={(data: ImageEditLibraryImageInfo) =>
          image?.uri && handleSaveImage(image, data)
        }
        containerStyle={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
};
