import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { useStyles } from './ImagesGroupStyles';
import FastImage from 'react-native-fast-image';

interface Props {
  groupIndex: number;
  images: Asset[];
  handleSetImage: (uri: string) => void;
}

export const ImagesGroup = memo<Props>(
  ({ groupIndex, handleSetImage, images }) => {
    const styles = useStyles();

    return (
      <View style={styles.container}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={`${groupIndex}.${index}-gallery-image`}
            style={styles.imageWrapper}
            onPress={() => handleSetImage(image.uri!)}
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
