import CameraRoll from '@react-native-community/cameraroll';
import { useEffect, useRef, useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { useLoader } from '../providers/Loader';
import { usePermissions } from '../providers/Permissions';

type FetchInfo = {
  after?: string;
  hasNextPage: boolean;
};

interface Props {
  album?: string;
  first?: number;
}

export const useGalleryImages = (props?: Props) => {
  const permissions = usePermissions();
  const loader = useLoader();
  const [images, setImages] = useState<Asset[]>([]);
  const fetchInfo = useRef<FetchInfo>({
    hasNextPage: true,
  });

  const fetchImages = async () => {
    if (props && !props.album) return;

    try {
      if (fetchInfo.current.hasNextPage) {
        const { page_info: pageInfo, edges } = await CameraRoll.getPhotos({
          first: props?.first || 10,
          assetType: 'Photos',
          after: fetchInfo.current.after,
          groupName: props?.album,
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
    } catch {}
  };

  useEffect(() => {
    setImages([]);
    fetchInfo.current = {
      hasNextPage: true,
    };
    (async () => {
      loader.handleShow();
      await fetchImages();
      loader.handleHide();
    })();
  }, [props?.album, permissions.storage]);

  return { images, fetchImages };
};
