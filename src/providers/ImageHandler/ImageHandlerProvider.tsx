import React, { FC, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { Asset } from 'react-native-image-picker';
import {
  ImageHandlerContext,
  ImageHandlerContextProps,
} from './ImageHandlerContext';
import { Ratio } from './models/Ratio';
import {
  handleSaveImage,
  handleUpdateRecentlyUsedRatios,
  handleShareImage,
  takePhotoFromGallery,
  takePhoto,
} from './helpers';
import { ImageCropperRef } from '../../components/ImageCropper/models/ImageCropperRef';
import { getItem } from '../../helpers/localStorage';
import { useModal } from '../Modal';
import { InfoModal } from '../../components/InfoModal';
import { SelectRatioModal } from '../../components/SelectRatioModal';
import { navigationContainerRef } from '../../navigation/MainStackNavigator';
import { usePermissions } from '../Permissions';
import { useLoader } from '../Loader';
import { simplifyRatio } from '../../helpers/simplifyRatio';
import { useMessages } from './ImageHandlerProviderMessages';

export const ImageHandlerProvider: FC = ({ children }) => {
  const messages = useMessages();
  const permissions = usePermissions();
  const modal = useModal();
  const loader = useLoader();
  const [image, setImage] = useState<Asset>();
  const [ratio, setRatio] = useState<Ratio>();
  const imageCropperRef: ImageCropperRef = useRef();
  const recentlyUsedRatiosRef = useRef<Ratio[]>([]);

  useEffect(() => {
    if (
      navigationContainerRef.getCurrentRoute()?.name !== 'cropImage' &&
      image
    ) {
      image?.height &&
        image?.width &&
        setRatio(simplifyRatio([image.height, image.width]));

      modal.handleOpen({ content: <SelectRatioModal /> });
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      const recentlyUsedRatios = await getItem<Ratio[]>('recently_used_ratios');

      recentlyUsedRatiosRef.current = recentlyUsedRatios || [];
    })();
  }, []);

  const handleTakePhotoFromGallery = async () => takePhotoFromGallery(setImage);

  const handleTakePhoto = async () => takePhoto(setImage);

  const handleCrop = async (params?: { save?: boolean; share?: boolean }) => {
    const { save = true, share = false } = params || {};

    if (imageCropperRef.current) {
      loader.handleShow();

      if (permissions.storage || (await permissions.askForStorage())) {
        try {
          const path = await imageCropperRef.current?.handleCrop();

          save && (await handleSaveImage(path));
          const shareResponse =
            (share && (await handleShareImage(path))) || undefined;

          ((share && shareResponse?.success) || save) &&
            modal.handleOpen({
              content: (
                <InfoModal
                  title={messages.allGod}
                  buttonText={messages.happyOk}
                  variant="success"
                />
              ),
            });
        } catch (e) {
          modal.handleOpen({
            content: (
              <InfoModal
                title={messages.error}
                buttonText={messages.sadOk}
                variant="danger"
              />
            ),
          });
        }
        const newRecentlyUsedRatios =
          ratio && (await handleUpdateRecentlyUsedRatios(ratio));

        if (newRecentlyUsedRatios) {
          recentlyUsedRatiosRef.current = newRecentlyUsedRatios;
        }
      } else {
        modal.handleOpen({
          content: (
            <InfoModal
              variant="primary"
              title={messages.permissionNeeded}
              buttonText={messages.openSettings}
              buttonOnPress={() => Linking.openSettings()}
            />
          ),
        });
      }

      loader.handleHide();
    }
  };

  const contextValue: ImageHandlerContextProps = {
    handleTakePhotoFromGallery,
    handleTakePhoto,
    setRatio,
    image,
    setImage,
    ratio,
    imageCropperRef,
    handleCrop,
    recentlyUsedRatiosRef,
  };

  return (
    <ImageHandlerContext.Provider value={contextValue}>
      {children}
    </ImageHandlerContext.Provider>
  );
};
