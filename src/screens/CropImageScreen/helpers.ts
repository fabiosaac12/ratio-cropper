import { PermissionsAndroid, Platform } from 'react-native';
import { ImageEditLibraryImageInfo } from './models/ImageEditLibraryImageinfo';
import CameraRoll from '@react-native-community/cameraroll';
import { Asset } from 'react-native-image-picker';
import { cropImage } from '../../helpers';

const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);

  return status === 'granted';
};

export const handleSaveImage = async (
  image: Asset,
  { image: crop, area }: ImageEditLibraryImageInfo,
) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return false;
  }

  if (image?.width && image?.height && image?.uri) {
    const imageHeight = image.height;
    const imageWidth = image.width;
    const x = (crop.x * imageWidth) / crop.width;
    const y = (crop.y * imageHeight) / crop.height;
    const heightToCrop = (area.height * imageHeight) / crop.height;
    const widthToCrop = (area.width * imageWidth) / crop.width;

    console.log(
      JSON.stringify(
        { crop, area, result: { x, y, heightToCrop, widthToCrop } },
        null,
        2,
      ),
    );

    const croppedImagePath = await cropImage({
      path: crop.uri,
      x,
      y,
      width: widthToCrop,
      height: heightToCrop,
    });

    console.log({ croppedImagePath });

    if (croppedImagePath) {
      const response = await CameraRoll.save(croppedImagePath, {
        album: 'Ratio Cropper',
      });

      console.log({ response });
    }
  }
};
