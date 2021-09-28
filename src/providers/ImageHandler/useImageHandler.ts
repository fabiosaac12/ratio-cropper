import { useContext } from 'react';
import { ImageHandlerContext } from './ImageHandlerContext';

export const useImageHandler = () => useContext(ImageHandlerContext);
