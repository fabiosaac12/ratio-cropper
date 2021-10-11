import { createContext } from 'react';
import { Asset } from 'react-native-image-picker';
import { ImageCropperRef } from '../../components/ImageCropper/models/ImageCropperRef';
import { Ratio } from './models/Ratio';

export interface ImageHandlerContextProps {
  handleTakePhotoFromGallery: () => void;
  handleTakePhoto: () => void;
  image?: Asset;
  ratio?: Ratio;
  setRatio: React.Dispatch<React.SetStateAction<Ratio | undefined>>;
  setImage: React.Dispatch<React.SetStateAction<Asset | undefined>>;
  imageCropperRef: ImageCropperRef;
  handleCrop: (params?: { save?: boolean; share?: boolean }) => void;
  recentlyUsedRatios: Ratio[];
}

export const ImageHandlerContext = createContext<ImageHandlerContextProps>(
  {} as ImageHandlerContextProps,
);
