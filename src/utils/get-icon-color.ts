import { IconProps } from '~/types/ui.ts';

export const getIconColor = (color: IconProps['color']) => {
  switch (color) {
    case 'success':
      return 'var(--color-success-fg)';
  }

  return 'currentColor';
};
