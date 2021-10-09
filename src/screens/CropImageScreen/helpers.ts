import { PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

export const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);

  return status === 'granted';
};

export const handleSaveImage = async (path: string) =>
  await CameraRoll.save(path, {
    album: 'Ratio Cropper',
  });
