import { MutableRefObject } from 'react';

export type ImageCropperRef = MutableRefObject<
  | {
      handleCrop: () => Promise<string>;
    }
  | undefined
>;
