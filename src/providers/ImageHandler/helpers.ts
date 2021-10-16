import CameraRoll from '@react-native-community/cameraroll';
import { getItem, setItem } from '../../helpers/localStorage';
import { Ratio } from '../../providers/ImageHandler/models/Ratio';
import Share from 'react-native-share';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { getImageSize } from '../../helpers/getImageSize';

export const takePhotoFromGallery = async (callback: (image: Asset) => void) =>
  launchImageLibrary(
    {
      quality: 1,
      mediaType: 'photo',
    },
    async ({ assets }) =>
      assets?.length &&
      assets[0].uri &&
      callback({ ...assets[0], ...(await getImageSize(assets[0].uri)) }),
  );

export const takePhoto = async (callback: (image: Asset) => void) =>
  launchCamera(
    {
      quality: 1,
      mediaType: 'photo',
    },
    async ({ assets }) =>
      assets?.length &&
      assets[0].uri &&
      callback({ ...assets[0], ...(await getImageSize(assets[0].uri)) }),
  );

export const handleSaveImage = async (path: string) =>
  await CameraRoll.save(path, {
    album: 'Ratio Cropper',
  });

export const handleShareImage = async (path: string) =>
  await Share.open({ url: `file://${path}`, failOnCancel: false });

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
