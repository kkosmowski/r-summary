import { IconProps } from '~/types/ui';
import { getIconColor } from '~/utils/get-icon-color';

export const SplitIcon = ({ size = 24, color, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    className={className}
    color={getIconColor(color)}
  >
    <path
      transform="matrix(-1 0 0 -1 24 24)"
      d="m14 4 2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"
      fill="currentColor"
    />
  </svg>
);
