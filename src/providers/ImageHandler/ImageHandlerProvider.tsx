import React, { FC, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  ImageHandlerContext,
  ImageHandlerContextProps,
} from './ImageHandlerContext';
import { Ratio } from './models/Ratio';
import {
  handleSaveImage,
  hasAndroidPermission,
  handleUpdateRecentlyUsedRatios,
  handleShareImage,
} from './helpers';
import { ImageCropperRef } from '../../components/ImageCropper/models/ImageCropperRef';
import { getItem } from '../../helpers/localStorage';
import { simplifyRatio } from '../../screens/HomeScreen/SelectRatioModal/helpers';
import { useModal } from '../Modal';
import { InfoModal } from '../../components/InfoModal';
import { SelectRatioModal } from '../../screens/HomeScreen/SelectRatioModal';
import { navigationContainerRef } from '../../navigation/MainStackNavigator';
import Snackbar from 'react-native-snackbar';
import { useTheme } from '../Theme';

export const ImageHandlerProvider: FC = ({ children }) => {
  const { theme } = useTheme();
  const modal = useModal();
  const [image, setImage] = useState<Asset>();
  const [ratio, setRatio] = useState<Ratio>();
  const imageCropperRef: ImageCropperRef = useRef();
  const recentlyUsedRatiosRef = useRef<Ratio[]>([]);

  useEffect(() => {
    if (
      navigationContainerRef.getCurrentRoute()?.name !== 'cropImage' &&
      image
    ) {
      image?.height &&
        image?.width &&
        setRatio(simplifyRatio([image.height, image.width]));

      modal.handleOpen({ content: <SelectRatioModal /> });
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      const recentlyUsedRatios = await getItem<Ratio[]>('recently_used_ratios');

      recentlyUsedRatiosRef.current = recentlyUsedRatios || [];

      hasAndroidPermission();
    })();
  }, []);

  const handleTakePhotoFromGallery = async () => {
    launchImageLibrary(
      {
        quality: 1,
        mediaType: 'photo',
      },
      ({ assets }) => assets?.length && setImage(assets[0]),
    );
  };

  const handleTakePhoto = async () => {
    launchCamera(
      {
        quality: 1,
        mediaType: 'photo',
      },
      ({ assets }) => assets?.length && setImage(assets[0]),
    );
  };

  const handleCrop = async (params?: { save?: boolean; share?: boolean }) => {
    const { save = true, share = false } = params || {};

    if (imageCropperRef.current) {
      if (await hasAndroidPermission()) {
        try {
          const path = await imageCropperRef.current?.handleCrop();

          save && (await handleSaveImage(path));
          const shareResponse =
            (share && (await handleShareImage(path))) || undefined;

          ((share && shareResponse?.success) || save) &&
            Snackbar.show({
              text: 'All good :)',
              duration: Snackbar.LENGTH_SHORT,
              textColor: theme.palette.primary[500],
              action: {
                text: ':)',
                onPress: Snackbar.dismiss,
              },
            });
        } catch {
          Snackbar.show({
            text: 'An error has occurred >:c',
            duration: Snackbar.LENGTH_SHORT,
            textColor: theme.palette.danger[500],
            action: {
              text: 'Oh :(',
              onPress: Snackbar.dismiss,
            },
          });
        }
        const newRecentlyUsedRatios =
          ratio && (await handleUpdateRecentlyUsedRatios(ratio));

        if (newRecentlyUsedRatios) {
          recentlyUsedRatiosRef.current = newRecentlyUsedRatios;
        }
      } else {
        modal.handleOpen({
          content: (
            <InfoModal
              title="I need your permission :c"
              buttonText="Open settings"
              buttonOnPress={() => Linking.openSettings()}
            />
          ),
        });
      }
    }
  };

  const contextValue: ImageHandlerContextProps = {
    handleTakePhotoFromGallery,
    handleTakePhoto,
    setRatio,
    image,
    setImage,
    ratio,
    imageCropperRef,
    handleCrop,
    recentlyUsedRatiosRef,
  };

  return (
    <ImageHandlerContext.Provider value={contextValue}>
      {children}
    </ImageHandlerContext.Provider>
  );
};
