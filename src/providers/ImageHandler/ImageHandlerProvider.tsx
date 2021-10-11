import React, { FC, useEffect, useRef, useState } from 'react';
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
import { ErrorModal } from '../../components/ErrorModal';
import { SuccessModal } from '../../components/SuccessModal';
import { SelectRatioModal } from '../../screens/HomeScreen/SelectRatioModal';
import { navigationContainerRef } from '../../navigation/MainStackNavigator';

export const ImageHandlerProvider: FC = ({ children }) => {
  const modal = useModal();
  const [image, setImage] = useState<Asset>();
  const [ratio, setRatio] = useState<Ratio>();
  const [recentlyUsedRatios, setRecentlyUsedRatios] = useState<Ratio[]>([]);
  const imageCropperRef: ImageCropperRef = useRef();

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

      setRecentlyUsedRatios(recentlyUsedRatios || []);
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

    if (imageCropperRef.current && (await hasAndroidPermission())) {
      try {
        const path = await imageCropperRef.current?.handleCrop();

        save && (await handleSaveImage(path));
        share && (await handleShareImage(path));

        !share &&
          modal.handleOpen({
            content: <SuccessModal title="All good :)" />,
          });
      } catch {
        modal.handleOpen({
          content: <ErrorModal title="An error has occurred >:c" />,
        });
      }
      const newRecentlyUsedRatios =
        ratio && (await handleUpdateRecentlyUsedRatios(ratio));

      newRecentlyUsedRatios && setRecentlyUsedRatios(newRecentlyUsedRatios);
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
    recentlyUsedRatios,
  };

  return (
    <ImageHandlerContext.Provider value={contextValue}>
      {children}
    </ImageHandlerContext.Provider>
  );
};
