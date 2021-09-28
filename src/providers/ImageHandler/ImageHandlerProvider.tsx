import React, { FC, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import {
  ImageHandlerContext,
  ImageHandlerContextProps,
} from './ImageHandlerContext';

export const ImageHandlerProvider: FC = ({ children }) => {
  const [image, setImage] = useState<any>();

  const handleTakePhotoFromGallery = async () => {
    launchImageLibrary(
      {
        quality: 0.5,
        mediaType: 'photo',
      },
      ({ assets }) => assets?.length && setImage(assets[0]),
    );
  };

  const handleTakePhoto = async () => {
    launchCamera(
      {
        quality: 0.5,
        mediaType: 'photo',
      },
      ({ assets }) => assets?.length && setImage(assets[0]),
    );
  };

  const contextValue: ImageHandlerContextProps = {
    handleTakePhotoFromGallery,
    handleTakePhoto,
  };

  return (
    <ImageHandlerContext.Provider value={contextValue}>
      {children}
    </ImageHandlerContext.Provider>
  );
};
