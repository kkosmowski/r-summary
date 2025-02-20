import { ReactNode } from 'react';
import { GroupBase } from 'react-select';
import RSSelect, { Props as SelectProps } from 'react-select';

import styles from '~/styles/reactSelectStyles.module.scss';
import { cn } from '~/utils/cn';

type Props<O, IsMulti extends boolean, G extends GroupBase<O>> = SelectProps<O, IsMulti, G> & {
  label: ReactNode;
};

export const Select = <O, IsMulti extends boolean, G extends GroupBase<O>>(props: Props<O, IsMulti, G>) => {
  const { className, id, label, ...rest } = props;

  const joinedClassName = [className, styles.rsInput].join(' ');

  return (
    <div className={cn(styles.inputWrapper, styles.withLabel)}>
      <label htmlFor={id} className="overlay-label">
        {label}
      </label>

      <RSSelect inputId={id} className={joinedClassName} {...rest} />
    </div>
  );
};
