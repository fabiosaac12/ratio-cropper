import { NativeModules } from 'react-native';

type CropImageFunction = (
  path: string,
  x: number,
  y: number,
  width: number,
  height: number,
) => Promise<string>;

type CropImageHelper = (params: {
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) => Promise<string>;

const CropImageModule = NativeModules.CropImageModule as {
  crop: CropImageFunction;
};

export const cropImage: CropImageHelper = async ({
  path,
  x,
  y,
  width,
  height,
}) => {
  const croppedImagePath = await CropImageModule.crop(
    path.startsWith('file://') ? path.substr(7) : path,
    Math.abs(Math.round(x)),
    Math.abs(Math.round(y)),
    Math.abs(Math.round(width)),
    Math.abs(Math.round(height)),
  );

  return croppedImagePath;
};
