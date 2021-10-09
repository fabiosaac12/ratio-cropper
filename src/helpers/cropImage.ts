import { NativeModules } from 'react-native';

type CropImageFunction = (
  path: string,
  x: number,
  y: number,
  width: number,
  height: number,
  outputFormat: 'png' | 'jepg',
  quality: number,
) => Promise<string>;

type CropImageHelper = (params: {
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
  outputFormat?: 'auto' | 'png' | 'jepg';
  quality?: number;
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
  outputFormat = 'auto',
  quality = 100,
}) => {
  if (quality > 100 || quality < 0) {
    throw new Error('Quality must be between 0 and 100');
  }

  console.log({ quality });

  const croppedImagePath = await CropImageModule.crop(
    path.startsWith('file://') ? path.substr(7) : path,
    Math.abs(Math.round(x)),
    Math.abs(Math.round(y)),
    Math.abs(Math.round(width)),
    Math.abs(Math.round(height)),
    outputFormat === 'auto'
      ? ((extension) =>
          (['png', 'jepg'].includes(extension)
            ? extension
            : extension === 'jpg'
            ? 'jepg'
            : 'png') as 'png' | 'jepg')(path.split('.').reverse()[0])
      : outputFormat,
    quality,
  );

  return croppedImagePath;
};
