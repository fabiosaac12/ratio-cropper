import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { withLayout } from '../../hoc';
import { MainStackNavigatorParamas } from '../../navigation/MainStackNavigator';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './HomeScreenStyles';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParamas, 'home'> {}

export const HomeScreen = withLayout<Props>(({ navigation }) => {
  const styles = useStyles();

  const { handleTakePhotoFromGallery, handleTakePhoto, image } =
    useImageHandler();

  useEffect(() => {
    image && navigation.navigate('cropImage');
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
