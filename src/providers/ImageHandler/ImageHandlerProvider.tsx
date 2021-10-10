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
} from './helpers';
import { ImageCropperRef } from '../../components/ImageCropper/models/ImageCropperRef';
import { getItem } from '../../helpers/localStorage';

export const ImageHandlerProvider: FC = ({ children }) => {
  const [image, setImage] = useState<Asset>();
  const [ratio, setRatio] = useState<Ratio>();
  const [quality, setQuality] = useState([100]);
  const [recentlyUsedRatios, setRecentlyUsedRatios] = useState<Ratio[]>([]);
  const imageCropperRef: ImageCropperRef = useRef();

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

  const handleCrop = async () => {
    if (imageCropperRef.current && (await hasAndroidPermission())) {
      const path = await imageCropperRef.current?.handleCrop({
        quality: quality[0],
      });

      handleSaveImage(path);
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
    ratio,
    quality,
    setQuality,
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
