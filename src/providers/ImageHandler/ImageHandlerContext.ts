import { createContext } from 'react';
import { Asset } from 'react-native-image-picker';

export interface ImageHandlerContextProps {
  handleTakePhotoFromGallery: () => void;
  handleTakePhoto: () => void;
  image?: Asset;
}

export const ImageHandlerContext = createContext<ImageHandlerContextProps>(
  {} as ImageHandlerContextProps,
);
