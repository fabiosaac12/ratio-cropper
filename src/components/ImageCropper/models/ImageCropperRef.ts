import { MutableRefObject } from 'react';
import { HandleCropFunction } from './HandleCropFunction';

export type ImageCropperRef = MutableRefObject<
  | {
      handleCrop: HandleCropFunction;
    }
  | undefined
>;
