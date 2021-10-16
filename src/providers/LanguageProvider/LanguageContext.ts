import { createContext } from 'react';

export type LanguageContextProps = {
  language: 'es' | 'en';
  setLanguage: (language: 'es' | 'en') => void;
};

export const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps,
);
