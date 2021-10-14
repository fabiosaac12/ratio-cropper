import { Ratio } from '../providers/ImageHandler/models/Ratio';

export const simplifyRatio = (ratio: Ratio, limit = 50): Ratio => {
  const value = ratio[0] / ratio[1];

  let lower: Ratio = [0, 1];
  let upper: Ratio = [1, 0];

  while (true) {
    let mediant: Ratio = [lower[0] + upper[0], lower[1] + upper[1]];

    if (value * mediant[1] > mediant[0]) {
      if (limit < mediant[1]) return upper;

      lower = mediant;
    } else if (value * mediant[1] == mediant[0]) {
      if (limit >= mediant[1]) return mediant;

      if (lower[1] < upper[1]) return lower;

      return upper;
    } else {
      if (limit < mediant[1]) return lower;

      upper = mediant;
    }
  }
};
