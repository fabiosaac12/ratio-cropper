import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { withLayout } from '../../hoc';
import { MainStackNavigatorParamas } from '../../navigation/MainStackNavigator';
import { useImageHandler } from '../../providers/ImageHandler';
import { useModal } from '../../providers/Modal';
import { useStyles } from './HomeScreenStyles';
import { SelectRatioModal } from './SelectRatioModal';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParamas, 'home'> {}

export const HomeScreen = withLayout<Props>(() => {
  const styles = useStyles();
  const modal = useModal();

  const { handleTakePhotoFromGallery, handleTakePhoto, image } =
    useImageHandler();

  useEffect(() => {
    image && modal.handleOpen({ content: <SelectRatioModal /> });
  }, [image]);

  return (
    <View style={styles.container}>
      <Button
        onPress={handleTakePhotoFromGallery}
        title="Select an image from gallery"
      />
      <Button onPress={handleTakePhoto} title="Take a photo" />
    </View>
  );
});
