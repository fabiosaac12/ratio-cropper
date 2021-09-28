import { createContext } from 'react';

export interface ImageHandlerContextProps {
  handleTakePhotoFromGallery: () => void;
  handleTakePhoto: () => void;
}

export const ImageHandlerContext = createContext<ImageHandlerContextProps>(
  {} as ImageHandlerContextProps,
);
