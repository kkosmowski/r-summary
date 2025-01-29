import { IconProps } from '~/types/ui';
import { getIconColor } from '~/utils/get-icon-color';

export const FiltersIcon = ({ size = 24, color, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    className={className}
    color={getIconColor(color)}
  >
    <g>
      <path d="M3 4c2.01 2.59 7 9 7 9v7h4v-7s4.98-6.41 7-9z" fill="currentColor" />
    </g>
  </svg>
);
