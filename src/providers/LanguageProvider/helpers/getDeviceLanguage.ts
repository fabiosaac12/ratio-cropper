import { NativeModules, Platform } from 'react-native';

export const getDeviceLanguage = () => {
  let deviceLanguage: string = (
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier
  ).replace(/_/, '-');

  deviceLanguage = deviceLanguage.split('-')[0];

  return deviceLanguage;
};
