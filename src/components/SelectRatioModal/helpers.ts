import { DefaultRatios } from './models/DefaultRatios';
import { useMessages } from './SelectRatioModalMessages';

export const getDefaultRatios: () => DefaultRatios = () => {
  const messages = useMessages();

  return [
    [
      {
        ratio: [1, 1],
        icon: 'logo-twitter',
        text: messages.profile,
      },
      {
        ratio: [1, 3],
        icon: 'logo-twitter',
        text: messages.banner,
      },
      {
        ratio: [9, 16],
        icon: 'logo-twitter',
        text: messages.post,
      },
    ],
    [
      {
        ratio: [1, 1],
        icon: 'logo-facebook',
        text: messages.post,
      },
      {
        ratio: [11, 21],
        icon: 'logo-facebook',
        text: messages.landscape,
      },
      {
        ratio: [5, 4],
        icon: 'logo-facebook',
        text: messages.portrait,
      },
      {
        ratio: [16, 9],
        icon: 'logo-facebook',
        text: messages.story,
      },
    ],
    [
      {
        ratio: [1, 1],
        icon: 'logo-instagram',
        text: messages.post,
      },
      {
        ratio: [11, 21],
        icon: 'logo-instagram',
        text: messages.landscape,
      },
      {
        ratio: [5, 4],
        icon: 'logo-instagram',
        text: messages.portrait,
      },
      {
        ratio: [16, 9],
        icon: 'logo-instagram',
        text: messages.story,
      },
      {
        ratio: [76, 49],
        icon: 'logo-instagram',
        text: messages.igtv,
      },
    ],
  ];
};
