import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { useStyles } from './ImageCropperStyles';
import ImageZoom from 'react-native-image-pan-zoom';
import { Dimensions } from './models/Dimensions';
import { Position } from './models/Position';
import { ImageCropperRef } from './models/ImageCropperRef';
import { State } from './models/State';
import { cropImage } from '../../helpers';

interface Props {
  uri: string;
  ratio: [number, number];
  imageCropperRef: ImageCropperRef;
}

export const ImageCropper: FC<Props> = ({ uri, ratio, imageCropperRef }) => {
  const windowDimensions = useWindowDimensions();
  const styles = useStyles();

  const [originalImageDimensions, setOriginalImage] = useState<Dimensions>();
  const [imageDimensions, setImageDimensions] = useState<Dimensions>();
  const [areaDimensions, setAreaDimensions] = useState<Dimensions>();
  const position = useRef<Position>({ positionX: 0, positionY: 0, scale: 1 });
  const [minScale, setMinScale] = useState<number>();

  const state = useRef<State>({
    originalImageDimensions,
    imageDimensions,
    areaDimensions,
  });

  state.current = {
    originalImageDimensions,
    imageDimensions,
    areaDimensions,
  };

  const handleCrop = async () => {
    const { areaDimensions, imageDimensions, originalImageDimensions } =
      state.current;

    if (imageDimensions && areaDimensions && originalImageDimensions) {
      const { positionX, positionY, scale } = position.current;

      const width = areaDimensions.width / scale;
      const height = areaDimensions.height / scale;
      const x = imageDimensions.width / 2 - positionX - width / 2;
      const y = imageDimensions.height / 2 - positionY - height / 2;

      const cropData = {
        width: (originalImageDimensions.width * width) / imageDimensions.width,
        height:
          (originalImageDimensions.height * height) / imageDimensions.height,
        x: Math.max(
          (originalImageDimensions.width * x) / imageDimensions.width,
          0,
        ),
        y: Math.max(
          (originalImageDimensions.height * y) / imageDimensions.height,
          0,
        ),
      };

      if (cropData.width + cropData.x > originalImageDimensions.width) {
        cropData.x = originalImageDimensions.width - cropData.width;
      }

      if (cropData.height + cropData.y > originalImageDimensions.height) {
        cropData.y = originalImageDimensions.height - cropData.height;
      }

      const croppedImagePath = await cropImage({ ...cropData, path: uri });

      return croppedImagePath;
    } else {
      throw new Error('Incomplete data to crop');
    }
  };

  useEffect(() => {
    imageCropperRef.current = {
      handleCrop,
    };
  }, [imageCropperRef]);

  useEffect(() => {
    if (imageDimensions && areaDimensions) {
      const minScale = Math.max(
        areaDimensions.height / imageDimensions.height,
        areaDimensions.width / imageDimensions.width,
      );

      setMinScale(minScale);

      position.current.scale = minScale;
    }
  }, [imageDimensions, areaDimensions]);

  useEffect(() => {
    let width: number;
    let height: number;

    if (ratio[0] > ratio[1]) {
      height = Math.min(windowDimensions.height, windowDimensions.width);
      width = (ratio[1] * height) / ratio[0];
    } else {
      width = Math.min(windowDimensions.height, windowDimensions.width);
      height = (ratio[0] * width) / ratio[1];
    }

    setAreaDimensions({ width, height });
  }, [windowDimensions, ratio]);

  useEffect(
    () =>
      Image.getSize(uri, (width, height) =>
        setOriginalImage({ width, height }),
      ),
    [uri],
  );

  useEffect(() => {
    if (originalImageDimensions) {
      let width: number;
      let height: number;

      if (originalImageDimensions.height > originalImageDimensions.width) {
        height = Math.min(windowDimensions.height, windowDimensions.width);
        width =
          (originalImageDimensions.width * height) /
          originalImageDimensions.height;
      } else {
        width = Math.min(windowDimensions.width, windowDimensions.height);
        height =
          (originalImageDimensions.height * width) /
          originalImageDimensions.width;
      }

      setImageDimensions({ width, height });
    }
  }, [originalImageDimensions]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.area} /> */}
      {imageDimensions && areaDimensions && minScale && (
        <ImageZoom
          cropWidth={areaDimensions.width}
          cropHeight={areaDimensions.height}
          imageWidth={imageDimensions.width}
          imageHeight={imageDimensions.height}
          onMove={(_position) => (position.current = _position)}
          minScale={minScale}
          enableCenterFocus={false}
          centerOn={{
            scale: minScale,
            x: position.current.positionX,
            y: position.current.positionY,
            duration: 0,
          }}
          doubleClickInterval={0}
          maxOverflow={0}
          swipeDownThreshold={0}
        >
          <Image
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
            }}
            source={{ uri }}
          />
        </ImageZoom>
      )}
    </View>
  );
};
