import { PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { getItem, setItem } from '../../helpers/localStorage';
import { Ratio } from '../../providers/ImageHandler/models/Ratio';

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

export const handleUpdateRecentlyUsedRatios = async (ratio: Ratio) => {
  const recentlyUsedRatios = await getItem<Ratio[]>('recently_used_ratios');

  let newRecentlyUsedRatios: Ratio[];

  if (recentlyUsedRatios) {
    newRecentlyUsedRatios = [
      ratio,
      ...recentlyUsedRatios
        .filter(
          (recentlyUsedRatio) =>
            JSON.stringify(recentlyUsedRatio) !== JSON.stringify(ratio),
        )
        .slice(0, 3),
    ];
  } else {
    newRecentlyUsedRatios = [ratio];
  }

  setItem('recently_used_ratios', newRecentlyUsedRatios);

  return newRecentlyUsedRatios;
};
