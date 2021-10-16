import { useLanguage } from '..';
import { FormattedMessages } from '../models/FormattedMessages';
import { Messages } from '../models/Messages';

export const defineMessages =
  <T extends string>(messages: Messages<T>) =>
  () => {
    const { language } = useLanguage();

    const formattedMessages = {} as FormattedMessages<keyof typeof messages>;

    for (let message in messages) {
      formattedMessages[message] = messages[message][language];
    }

    return formattedMessages;
  };
