import React, { ReactChild, useState } from 'react';
import { ModalContext, ModalContextProps } from './ModalContext';

export const ModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactChild>();

  const contextValue: ModalContextProps = {
    visible,
    content,
    handleOpen: ({ content }) => {
      setVisible(true);
      setContent(content);
    },
    handleHide: () => setVisible(false),
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
