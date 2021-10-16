import React, { FC, useState } from 'react';
import { getDeviceLanguage } from './helpers/getDeviceLanguage';
import { LanguageContext, LanguageContextProps } from './LanguageContext';
import { isInstanceOfLanguage, Language } from './models/Language';

interface Props {
  defaultLanguage: Language;
}

const deviceLanguage = getDeviceLanguage();

export const LanguageProvider: FC<Props> = ({ children, defaultLanguage }) => {
  const [language, setLanguage] = useState<Language>(
    isInstanceOfLanguage(deviceLanguage) ? deviceLanguage : defaultLanguage,
  );

  const contextValue: LanguageContextProps = { language, setLanguage };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
