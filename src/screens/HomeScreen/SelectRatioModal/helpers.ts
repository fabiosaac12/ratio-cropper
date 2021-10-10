import { Ratio } from '../../../providers/ImageHandler/models/Ratio';
import { DefaultRatios } from './models/DefaultRatios';

const getGcd = (a: number, b: number): number => (b ? getGcd(b, a % b) : a);

export const simplifyRatio = (ratio: Ratio): Ratio => {
  const gcd = getGcd(ratio[0], ratio[1]);

  return [ratio[0] / gcd, ratio[1] / gcd];
};

export const defaultRatios: DefaultRatios = [
  {
    ratio: [1, 1],
    icon: 'logo-twitter',
    text: 'Profile',
  },
  {
    ratio: [1, 3],
    icon: 'logo-twitter',
    text: 'Banner',
  },
  {
    ratio: [9, 16],
    icon: 'logo-twitter',
    text: 'Post',
  },
  {
    ratio: [1, 1],
    icon: 'logo-facebook',
    text: 'Post',
  },
  {
    ratio: [1, 1.91],
    icon: 'logo-facebook',
    text: 'Landscape',
  },
  {
    ratio: [5, 4],
    icon: 'logo-facebook',
    text: 'Portrait',
  },
  {
    ratio: [16, 9],
    icon: 'logo-facebook',
    text: 'Story',
  },
  {
    ratio: [1.55, 1],
    icon: 'logo-instagram',
    text: 'IGTV',
  },
];
