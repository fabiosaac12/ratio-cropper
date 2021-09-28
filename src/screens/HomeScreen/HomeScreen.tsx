import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { withLayout } from '../../hoc';
import { useImageHandler } from '../../providers/ImageHandler';

export const HomeScreen = withLayout(() => {
  const { handleTakePhotoFromGallery, handleTakePhoto } = useImageHandler();

  return (
    <View>
      <Button
        onPress={handleTakePhotoFromGallery}
        title="Select an image from gallery"
      />
      <Button onPress={handleTakePhoto} title="Take a photo" />
    </View>
  );
});
