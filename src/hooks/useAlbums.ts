import CameraRoll from '@react-native-community/cameraroll';
import { useEffect, useState } from 'react';
import { usePermissions } from '../providers/Permissions';

export const useAlbums = () => {
  const permissions = usePermissions();
  const [albums, setAlbums] = useState<string[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();

  const fetchAlbums = async () => {
    const albums = await CameraRoll.getAlbums({ assetType: 'Photos' });

    setAlbums(albums.map((album) => album.title));
    albums.length && setSelectedAlbum(albums[0].title);
  };

  useEffect(() => {
    permissions.storage && fetchAlbums();
  }, [permissions.storage]);

  return {
    selectedAlbum,
    setSelectedAlbum,
    albums,
  };
};
