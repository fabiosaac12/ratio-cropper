import { createContext } from 'react';

export interface PermissionsContextProps {
  storage: boolean;
  askForStorage: () => Promise<boolean>;
}

export const PermissionsContext = createContext<PermissionsContextProps>(
  {} as PermissionsContextProps,
);
