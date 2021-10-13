import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { useGalleryImages } from '../../hooks/useGalleryImages';
import { useImageHandler } from '../../providers/ImageHandler';
import { ImagesGroup } from './ImagesGroup';

interface Props {
  selectedAlbum?: string;
}

export const Gallery: FC<Props> = ({ selectedAlbum }) => {
  const { setImage } = useImageHandler();
  const [groupedImages, setGroupedImages] = useState<Asset[][]>();

  const { fetchImages, images } = useGalleryImages({
    album: selectedAlbum,
    first: 45,
  });

  useEffect(() => {
    if (images.length) {
      const groupedImages = images.reduce<Asset[][]>(
        (groupedImages, currentImage, index) => {
          const newGroupedImages = [...groupedImages];
          const position = Math.floor(index / 3);

          newGroupedImages[position] = [
            ...(newGroupedImages[position] || []),
            currentImage,
          ];

          return newGroupedImages;
        },
        [],
      );

      setGroupedImages(groupedImages);
    }
  }, [images]);

  const handleSetImage = (uri: string) =>
    Image.getSize(uri, (width, height) => setImage({ uri, width, height }));

  const renderImageGroup: ListRenderItem<Asset[]> = ({ index, item }) => (
    <ImagesGroup
      images={item}
      groupIndex={index}
      handleSetImage={handleSetImage}
    />
  );

  return (
    <>
      <FlatList
        onEndReached={fetchImages}
        onEndReachedThreshold={1}
        keyExtractor={(_, index) => `gallery-image-${index}`}
        data={groupedImages}
        showsVerticalScrollIndicator={false}
        renderItem={renderImageGroup}
      />
    </>
  );
};
