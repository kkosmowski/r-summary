import { IconProps } from '~/types/ui';
import { getIconColor } from '~/utils/get-icon-color';

export const MergedIcon = ({ size = 24, color, className }: IconProps) => (
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
      d="M17 20.41 18.41 19 15 15.59 13.59 17zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5z"
      fill="currentColor"
    />
  </svg>
);
