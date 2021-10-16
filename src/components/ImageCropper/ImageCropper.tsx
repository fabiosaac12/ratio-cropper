import React, { FC, LegacyRef, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useStyles } from './ImageCropperStyles';
import ImageZoom from 'react-native-image-pan-zoom';
import { Dimensions } from './models/Dimensions';
import { Position } from './models/Position';
import { ImageCropperRef } from './models/ImageCropperRef';
import { State } from './models/State';
import { cropImage } from '../../helpers/cropImage';
import { HandleCropFunction } from './models/HandleCropFunction';
import { CenterOn } from './models/CenterOn';
import ImageViewer from 'react-native-image-pan-zoom/built/image-zoom/image-zoom.component';
import { getImageSize } from '../../helpers/getImageSize';
import { useImagePreviewModal } from '../../providers/ImagePreviewModal';

interface Props {
  uri: string;
  ratio: [number, number];
  imageCropperRef: ImageCropperRef;
}

export const ImageCropper: FC<Props> = ({
  uri,
  ratio,
  imageCropperRef,
  children,
}) => {
  const styles = useStyles();
  const imagePreviewModal = useImagePreviewModal();
  const windowDimensions = useWindowDimensions();
  const imageZoomRef: LegacyRef<ImageViewer> = useRef({} as ImageViewer);

  const [originalImageDimensions, setOriginalImageDimensions] =
    useState<Dimensions>();

  const [imageDimensions, setImageDimensions] = useState<Dimensions>();
  const [areaDimensions, setAreaDimensions] = useState<Dimensions>();
  const [minScale, setMinScale] = useState<number>();
  const [centerOn, setCenterOn] = useState<CenterOn>();
  const position = useRef<Position>({ positionX: 0, positionY: 0, scale: 1 });

  const state = useRef<State>({
    originalImageDimensions,
    imageDimensions,
    areaDimensions,
    imageUri: uri,
  });

  state.current = {
    originalImageDimensions,
    imageDimensions,
    areaDimensions,
    imageUri: uri,
  };

  const handleCrop: HandleCropFunction = async () => {
    const {
      areaDimensions,
      imageDimensions,
      originalImageDimensions,
      imageUri,
    } = state.current;

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

      const croppedImagePath = await cropImage({ ...cropData, path: imageUri });

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

      position.current.scale = minScale;

      setMinScale(minScale);
      setCenterOn({ duration: 0, scale: minScale, x: 0, y: 0 });
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

  useEffect(() => {
    (async () => setOriginalImageDimensions(await getImageSize(uri)))();
  }, [uri]);

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
    <ImageBackground source={{ uri }} style={styles.container} blurRadius={10}>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => imagePreviewModal.handleOpen(uri)}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      {children}
      <View style={[styles.verticalArea, areaDimensions]} pointerEvents="none">
        {[1, 2, 3, 4].map((id) => (
          <View key={`${id}VerticalLine`} style={styles.verticalAreaLine} />
        ))}
      </View>
      <View
        style={[styles.horizontalArea, areaDimensions]}
        pointerEvents="none"
      >
        {[1, 2, 3, 4].map((id) => (
          <View key={`${id}HorizontalLine`} style={styles.horizontalAreaLine} />
        ))}
      </View>
      {imageDimensions && areaDimensions && minScale && (
        <ImageZoom
          ref={imageZoomRef}
          cropWidth={areaDimensions.width}
          cropHeight={areaDimensions.height}
          imageWidth={imageDimensions.width}
          imageHeight={imageDimensions.height}
          onMove={(_position) => (position.current = _position)}
          minScale={minScale}
          enableCenterFocus={false}
          centerOn={centerOn}
          onDoubleClick={() =>
            centerOn && imageZoomRef.current?.centerOn(centerOn)
          }
          enableDoubleClickZoom={false}
          maxOverflow={0}
          swipeDownThreshold={0}
          onLongPress={() => imagePreviewModal.handleOpen(uri)}
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
    </ImageBackground>
  );
};
