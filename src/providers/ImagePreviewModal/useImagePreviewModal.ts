import { useContext } from 'react';
import { ImagePreviewModalContext } from './ImagePreviewModalContext';

export const useImagePreviewModal = () => useContext(ImagePreviewModalContext);
