import { IconProps } from '~/types/ui';
import { getIconColor } from '~/utils/get-icon-color';

export const CloseIcon = ({ size = 24, color, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    className={className}
    color={getIconColor(color)}
  >
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill="currentColor"
    />
  </svg>
);
