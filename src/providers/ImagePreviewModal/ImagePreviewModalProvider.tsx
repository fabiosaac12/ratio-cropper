import React, { useState } from 'react';
import {
  ImagePreviewModalContext,
  ImagePreviewModalContextProps,
} from './ImagePreviewModalContext';

export const ImagePreviewModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState<string>();

  const contextValue: ImagePreviewModalContextProps = {
    visible,
    uri,
    handleOpen: (uri) => {
      setUri(uri);
      setVisible(true);
    },
    handleHide: () => setVisible(false),
  };

  return (
    <ImagePreviewModalContext.Provider value={contextValue}>
      {children}
    </ImagePreviewModalContext.Provider>
  );
};
