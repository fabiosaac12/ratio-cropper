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
  handleUpdateRecentlyUsedRatios,
  handleShareImage,
} from './helpers';
import { ImageCropperRef } from '../../components/ImageCropper/models/ImageCropperRef';
import { getItem } from '../../helpers/localStorage';
import { useModal } from '../Modal';
import { InfoModal } from '../../components/InfoModal';
import { SelectRatioModal } from '../../components/SelectRatioModal';
import { navigationContainerRef } from '../../navigation/MainStackNavigator';
import Snackbar from 'react-native-snackbar';
import { useTheme } from '../Theme';
import { usePermissions } from '../Permissions';
import { useLoader } from '../Loader';
import { simplifyRatio } from '../../helpers/simplifyRatio';

export const ImageHandlerProvider: FC = ({ children }) => {
  const { theme } = useTheme();
  const permissions = usePermissions();
  const modal = useModal();
  const loader = useLoader();
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
      loader.handleShow();

      if (permissions.storage || (await permissions.askForStorage())) {
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
              backgroundColor: theme.palette.background[300],
              action: {
                text: ':)',
                onPress: Snackbar.dismiss,
                textColor: theme.palette.primary[500],
              },
            });
        } catch (e) {
          Snackbar.show({
            text: 'An error has occurred >:c',
            duration: Snackbar.LENGTH_SHORT,
            textColor: theme.palette.danger[500],
            backgroundColor: theme.palette.background[300],
            action: {
              text: 'Oh :(',
              onPress: Snackbar.dismiss,
              textColor: theme.palette.danger[500],
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

      loader.handleHide();
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
