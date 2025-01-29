import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Color } from '~/types/ui';

type ButtonVariant = 'regular' | 'filled';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  color?: Color;
  variant?: ButtonVariant;
  withIcon?: ReactNode;
  icon?: ReactNode;
  active?: boolean;
};

const getClassName = ({ className, color, icon, withIcon, variant, active }: ButtonProps) => {
  let result = className ?? '';

  if (icon) result += ` --icon`;
  else if (withIcon) result += ` --with-icon`;
  if (color) result += ` --${color}`;
  if (variant !== 'regular') result += ` --${variant}`;
  if (active) result += ` --active`;

  return result;
};

export const Button = (props: ButtonProps) => {
  const { icon, children, active, withIcon, ...rest } = props;
  const className = getClassName(props);

  return (
    <button {...rest} className={className}>
      {withIcon} {icon ?? children}
    </button>
  );
};
