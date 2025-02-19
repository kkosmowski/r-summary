import { Color } from '~/types/ui';

export const getIconColor = (color: Color | undefined) => {
  switch (color) {
    case 'success':
      return 'var(--color-success-500)';
    case 'primary':
      return 'var(--color-primary-500)';
    case 'error':
      return 'var(--color-error-500)';
  }

  return 'currentColor';
};
