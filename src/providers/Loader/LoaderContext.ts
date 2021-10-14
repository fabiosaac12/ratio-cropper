import { createContext } from 'react';

export interface LoaderContextProps {
  visible: boolean;
  handleShow: () => void;
  handleHide: () => void;
}

export const LoaderContext = createContext<LoaderContextProps>(
  {} as LoaderContextProps,
);
