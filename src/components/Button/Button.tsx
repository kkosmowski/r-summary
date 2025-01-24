import { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { Color } from '~/types/ui';

type ButtonVariant = 'regular' | 'filled';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  color?: Color;
  variant?: ButtonVariant;
  icon?: ReactNode;
};

const getClassName = ({ className, color, icon, variant }: ButtonProps) => {
  let result = className ?? '';

  if (icon) result += ` --icon`;
  if (color) result += ` --${color}`;
  if (variant !== 'regular') result += ` --${variant}`;

  return result;
};

export const Button = (props: ButtonProps) => {
  const { icon, children, ...rest } = props;
  const className = getClassName(props);

  return (
    <button {...rest} className={className}>
      {icon ?? children}
    </button>
  );
};
