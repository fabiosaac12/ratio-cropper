import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { ImageCropper } from '../../components/ImageCropper';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';
import { Text } from '../../components/Text';
import Slider from '@ptomasroos/react-native-multi-slider';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useModal } from '../../providers/Modal';
import { SelectRatioModal } from '../HomeScreen/SelectRatioModal';

export const CropImageScreen: FC = () => {
  const styles = useStyles();
  const { image, ratio, handleCrop, imageCropperRef, quality, setQuality } =
    useImageHandler();
  const modal = useModal();

  return (
    <View style={styles.container}>
      {image?.uri && ratio && (
        <ImageCropper
          uri={image.uri}
          ratio={ratio}
          imageCropperRef={imageCropperRef}
        >
          <FloatingActionButton
            position="br"
            title={`${ratio[0]} : ${ratio[1]}`}
            onPress={() => modal.handleOpen({ content: <SelectRatioModal /> })}
          />
        </ImageCropper>
      )}

      <View style={styles.quantitySlider}>
        <Text variant="button" style={styles.qualityLabel}>
          QUALITY
        </Text>
        <Slider
          values={quality}
          min={0}
          max={100}
          containerStyle={styles.quantitySlider}
          onValuesChange={setQuality}
          selectedStyle={styles.qualitySliderSelected}
          markerStyle={styles.qualitySliderMarker}
        />
        <Text variant="button" style={styles.qualityLabel}>
          {quality}
        </Text>
      </View>

      <Button style={styles.cropButton} title="Crop" onPress={handleCrop} />
    </View>
  );
};
