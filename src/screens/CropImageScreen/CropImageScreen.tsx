import React, { FC } from 'react';
import { View } from 'react-native';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';
import ImageEdit from 'react-native-imageedit';

export const CropImageScreen: FC = () => {
  const styles = useStyles();
  const { image } = useImageHandler();

  console.log(image);

  return (
    <View>
      <ImageEdit
        width={300}
        height={400}
        image={image?.uri}
        onSave={(info: any) => console.log(info)}
        containerStyle={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
};
