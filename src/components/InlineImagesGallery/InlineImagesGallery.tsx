import React from 'react';
import { Asset } from 'react-native-image-picker';
import {
  FlatList,
  Image as RNImage,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { useStyles } from './InlineImagesGalleryStyles';
import { useImageHandler } from '../../providers/ImageHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from './Image';
import { useGalleryImages } from '../../hooks/useGalleryImages';

export const InlineImagesGallery = () => {
  const styles = useStyles();
  const { setImage, handleTakePhoto, handleTakePhotoFromGallery } =
    useImageHandler();
  const { fetchImages, images } = useGalleryImages();

  const handleSetImage = (uri: string) =>
    RNImage.getSize(uri, (width, height) => setImage({ uri, width, height }));

  const renderItem: ListRenderItem<Asset> = ({ item, index }) => (
    <>
      {index === 0 && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Icon name="camera" style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleTakePhotoFromGallery}
          >
            <Icon name="image" style={styles.buttonIcon} />
          </TouchableOpacity>
        </>
      )}
      {item.uri ? <Image handleSetImage={handleSetImage} image={item} /> : null}
    </>
  );

  return (
    <FlatList
      keyExtractor={(item, index) => `${item.uri}-${index}-iig`}
      data={images.length ? images : [{}]}
      renderItem={renderItem}
      horizontal
      onEndReached={fetchImages}
      onEndReachedThreshold={0.5}
      showsHorizontalScrollIndicator={false}
      style={styles.flatList}
    />
  );
};
