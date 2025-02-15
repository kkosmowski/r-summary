import { Color } from '~/types/ui';

export const getIconColor = (color: Color | undefined) => {
  switch (color) {
    case 'success':
      return 'var(--color-success-500)';
  }

  return 'currentColor';
};
