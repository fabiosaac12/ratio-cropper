import CameraRoll from '@react-native-community/cameraroll';
import { useEffect, useRef, useState } from 'react';
import { Asset } from 'react-native-image-picker';

type FetchInfo = {
  after?: string;
  hasNextPage: boolean;
};

interface Props {
  album?: string;
  first?: number;
}

export const useGalleryImages = (props?: Props) => {
  const [images, setImages] = useState<Asset[]>([]);
  const fetchInfo = useRef<FetchInfo>({
    hasNextPage: true,
  });

  const fetchImages = async () => {
    if (props && !props.album) return;

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
  };

  useEffect(() => {
    setImages([]);
    fetchInfo.current = {
      hasNextPage: true,
    };

    fetchImages();
  }, [props?.album]);

  return { images, fetchImages };
};
