import { Dimensions } from './Dimensions';

export type State = {
  originalImageDimensions?: Dimensions;
  imageDimensions?: Dimensions;
  areaDimensions?: Dimensions;
  imageUri: string;
};
