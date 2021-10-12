import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { useGalleryImages } from '../../helpers/useGalleryImages';
import { useImageHandler } from '../../providers/ImageHandler';
import { Button } from '../Button';
import { useStyles } from './GalleryStyles';
import { ImagesGroup } from './ImagesGroup';

export const Gallery = () => {
  const styles = useStyles();
  const { setImage } = useImageHandler();
  const [albums, setAlbums] = useState<string[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();
  const [groupedImages, setGroupedImages] = useState<Asset[][]>();

  const { fetchImages, images } = useGalleryImages({
    album: selectedAlbum,
    first: 45,
  });

  const fetchAlbums = async () => {
    const albums = await CameraRoll.getAlbums({ assetType: 'Photos' });

    setAlbums(albums.map((album) => album.title));
    albums.length && setSelectedAlbum(albums[1].title);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

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

  const renderAlbumTab: ListRenderItem<string> = ({ item }) => (
    <Button
      onPress={() => setSelectedAlbum(item)}
      title={item}
      variant="outlined"
      disabled={selectedAlbum === item}
    />
  );

  if (!albums.length) return null;

  return (
    <>
      <View>
        <FlatList data={albums} horizontal renderItem={renderAlbumTab} />
      </View>
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
