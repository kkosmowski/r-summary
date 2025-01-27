import { hexToDec } from '~/utils/hex-to-dec';
import { rgbToHsl } from '~/utils/rgb-to-hsl';

export const hexToHsl = (hex: string) => {
  const rgb = hexToDec(hex);
  return rgbToHsl(rgb);
};
