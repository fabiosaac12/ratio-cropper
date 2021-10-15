import React from 'react';
import { View } from 'react-native';
import { ImageCropper } from '../../components/ImageCropper';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './CropImageScreenStyles';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useModal } from '../../providers/Modal';
import { SelectRatioModal } from '../../components/SelectRatioModal';
import { InlineImagesGallery } from '../../components/InlineImagesGallery';
import { FloatingActionIconButton } from '../../components/FloatingActionIconButton';
import { withLayout } from '../../hoc';

export const CropImageScreen = withLayout(() => {
  const styles = useStyles();
  const { image, ratio, handleCrop, imageCropperRef } = useImageHandler();
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

      <InlineImagesGallery />

      <FloatingActionIconButton
        iconName="share-social"
        onPress={() => handleCrop({ share: true, save: false })}
        position="bl"
        variant="outlined"
        color="secondary"
        disabled={ratio?.includes(0)}
      />

      <FloatingActionIconButton
        iconName="crop"
        onPress={handleCrop}
        position="br"
        disabled={ratio?.includes(0)}
      />
    </View>
  );
});
