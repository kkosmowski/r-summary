import { hexToHsl } from '~/utils/hex-to-hsl';

const getTextColorBasedOnBg = (bgColor: string): '#000' | '#fff' => {
  bgColor = bgColor.replace('#', '');
  const [_, __, l] = hexToHsl(bgColor);

  // this is very naïve, improve as you go
  if (l < 50) return '#fff';
  return '#000';
};

export const getColors = (color: 'light' | 'dark' | null, bgColor: string | null) => {
  if (!bgColor) {
    return {
      textColor: 'var(--color-fg-50)',
      backgroundColor: 'var(--color-bg-200)',
    };
  }

  if (!color) {
    return {
      textColor: getTextColorBasedOnBg(bgColor),
      backgroundColor: bgColor,
    };
  }

  return {
    textColor: color === 'dark' ? '#000' : '#fff',
    backgroundColor: bgColor,
  };
};
