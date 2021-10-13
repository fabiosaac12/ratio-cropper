import React, { FC, useEffect, useState } from 'react';
import { AppState, PermissionsAndroid } from 'react-native';
import {
  PermissionsContext,
  PermissionsContextProps,
} from './PermissionsContext';

export const PermissionsProvider: FC = ({ children }) => {
  const [storage, setStorage] = useState(false);

  const askForStorage = async (request = true) => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    let hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      setStorage(hasPermission);

      return true;
    }

    const status = request && (await PermissionsAndroid.request(permission));

    hasPermission = status === 'granted';

    setStorage(hasPermission);

    return hasPermission;
  };

  useEffect(() => {
    askForStorage();

    AppState.addEventListener(
      'change',
      (state) => state === 'active' && askForStorage(false),
    );
  }, []);

  const contextValue: PermissionsContextProps = {
    askForStorage,
    storage,
  };

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};
