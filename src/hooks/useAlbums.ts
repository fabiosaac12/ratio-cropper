import CameraRoll from '@react-native-community/cameraroll';
import { useEffect, useState } from 'react';

export const useAlbums = () => {
  const [albums, setAlbums] = useState<string[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();

  const fetchAlbums = async () => {
    const albums = await CameraRoll.getAlbums({ assetType: 'Photos' });

    setAlbums(albums.map((album) => album.title));
    albums.length && setSelectedAlbum(albums[0].title);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return {
    selectedAlbum,
    setSelectedAlbum,
    albums,
  };
};
