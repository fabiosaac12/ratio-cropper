import React, { useState } from 'react';
import { LoaderContext, LoaderContextProps } from './LoaderContext';

export const LoaderProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<number>(0);

  const contextValue: LoaderContextProps = {
    visible: !!loading,
    handleHide: () => setLoading((loading) => loading - 1),
    handleShow: () => setLoading((loading) => loading + 1),
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  );
};
