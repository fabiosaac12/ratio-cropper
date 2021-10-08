import React, { FC, useState } from 'react';
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

export const ImageHandlerProvider: FC = ({ children }) => {
  const [image, setImage] = useState<Asset>();
  const [ratio, setRatio] = useState<Ratio>();

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

  const contextValue: ImageHandlerContextProps = {
    handleTakePhotoFromGallery,
    handleTakePhoto,
    setRatio,
    image,
    ratio,
  };

  return (
    <ImageHandlerContext.Provider value={contextValue}>
      {children}
    </ImageHandlerContext.Provider>
  );
};
