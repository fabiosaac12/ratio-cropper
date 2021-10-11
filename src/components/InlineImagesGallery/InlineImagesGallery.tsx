import React, { useEffect, useRef, useState } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import { Asset } from 'react-native-image-picker';
import { FetchInfo } from './models/FetchInfo';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { useStyles } from './InlineImagesGalleryStyles';
import { useImageHandler } from '../../providers/ImageHandler';
import Icon from 'react-native-vector-icons/Ionicons';

export const InlineImagesGallery = () => {
  const styles = useStyles();
  const { setImage, handleTakePhoto, handleTakePhotoFromGallery } =
    useImageHandler();
  const [images, setImages] = useState<Asset[]>([]);
  const fetchInfo = useRef<FetchInfo>({
    hasNextPage: true,
  });

  const fetchImages = async () => {
    if (fetchInfo.current.hasNextPage) {
      const { page_info: pageInfo, edges } = await CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
        after: fetchInfo.current.after,
      });

      fetchInfo.current = {
        after: pageInfo.end_cursor,
        hasNextPage: pageInfo.has_next_page,
      };

      setImages((images) => [
        ...images,
        ...edges.map((edge) => ({ uri: edge.node.image.uri })),
      ]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSetImage = (uri: string) =>
    Image.getSize(uri, (width, height) => setImage({ uri, width, height }));

  return (
    <FlatList
      keyExtractor={(item, index) => `${item.uri}-${index}-iig`}
      data={images}
      renderItem={({ item, index }) => (
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
          {item.uri ? (
            <TouchableOpacity
              style={styles.imageWrapper}
              onPress={() => handleSetImage(item.uri!)}
            >
              <Image style={styles.image} source={item} />
            </TouchableOpacity>
          ) : null}
        </>
      )}
      horizontal
      onEndReached={fetchImages}
      onEndReachedThreshold={0.5}
      showsHorizontalScrollIndicator={false}
    />
  );
};
