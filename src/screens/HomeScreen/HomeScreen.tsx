import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { Gallery } from '../../components/Gallery';
import { withLayout } from '../../hoc';
import { MainStackNavigatorParams } from '../../navigation/MainStackNavigator';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './HomeScreenStyles';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParams, 'home'> {}

export const HomeScreen = withLayout<Props>(() => {
  const styles = useStyles();

  const { handleTakePhotoFromGallery, handleTakePhoto, image } =
    useImageHandler();

  return (
    <View style={styles.container}>
      <Button
        onPress={handleTakePhotoFromGallery}
        title="Select an image from gallery"
      />
      <Button onPress={handleTakePhoto} title="Take a photo" />
      <Gallery />
    </View>
  );
});
