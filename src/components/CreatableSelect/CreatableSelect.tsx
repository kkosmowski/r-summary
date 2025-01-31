import { ReactNode } from 'react';
import { GroupBase } from 'react-select';
import RSCreatableSelect, { CreatableProps } from 'react-select/creatable';

import styles from '~/styles/reactSelectStyles.module.scss';

type Props<O, IsMulti extends boolean, G extends GroupBase<O>> = CreatableProps<O, IsMulti, G> & {
  label: ReactNode;
};

export const CreatableSelect = <O, IsMulti extends boolean, G extends GroupBase<O>>(props: Props<O, IsMulti, G>) => {
  const { className, id, label, ...rest } = props;

  const joinedClassName = [className, styles.rsInput].join(' ');

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className="overlay-label">
        {label}
      </label>

      <RSCreatableSelect
        {...rest}
        className={joinedClassName}
        noOptionsMessage={() => 'No options – type custom one'}
        inputId={id}
      />
    </div>
  );
};
