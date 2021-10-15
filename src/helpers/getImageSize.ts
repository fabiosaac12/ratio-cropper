import ImageSize from 'react-native-image-size';

export const getImageSize = async (uri: string) => {
  const {
    height: _height,
    width: _width,
    rotation = 0,
  } = await ImageSize.getSize(uri);

  let height = _height;
  let width = _width;

  if ((rotation / 90) % 2 !== 0) {
    height = _width;
    width = _height;
  }

  return { width, height };
};
