import { IconProps } from '~/types/ui';
import { getIconColor } from '~/utils/get-icon-color';

export const StraightIcon = ({ size = 24, color, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    className={className}
    color={getIconColor(color)}
  >
    <g>
      <path d="M11 6.83 9.41 8.41 8 7l4-4 4 4-1.41 1.41L13 6.83V21h-2z" fill="currentColor" />
    </g>
  </svg>
);
