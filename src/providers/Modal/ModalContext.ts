import { createContext, ReactChild } from 'react';

export interface ModalContextProps {
  visible: boolean;
  handleOpen: ({ content }: { content: ReactChild }) => void;
  handleHide: () => void;
  content?: ReactChild;
}

export const ModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps,
);
