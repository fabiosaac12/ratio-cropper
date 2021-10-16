import { createContext } from 'react';

export interface ImagePreviewModalContextProps {
  visible: boolean;
  handleOpen: (uri: string) => void;
  handleHide: () => void;
  uri?: string;
}

export const ImagePreviewModalContext =
  createContext<ImagePreviewModalContextProps>(
    {} as ImagePreviewModalContextProps,
  );
