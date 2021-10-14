import CameraRoll from '@react-native-community/cameraroll';
import { useEffect, useState } from 'react';
import { useLoader } from '../providers/Loader';
import { usePermissions } from '../providers/Permissions';

export const useAlbums = () => {
  const permissions = usePermissions();
  const loader = useLoader();
  const [albums, setAlbums] = useState<string[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();

  const fetchAlbums = async () => {
    loader.handleShow();

    try {
      const albums = await CameraRoll.getAlbums({ assetType: 'Photos' });

      setAlbums(albums.map((album) => album.title));
      albums.length && setSelectedAlbum(albums[0].title);
    } catch {}

    loader.handleHide();
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
