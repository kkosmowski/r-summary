import { GroupBase } from 'react-select';
import RSCreatableSelect, { CreatableProps } from 'react-select/creatable';

import styles from '~/styles/reactSelectStyles.module.scss';

export const CreatableSelect = <O, IsMulti extends boolean, G extends GroupBase<O>>(
  props: CreatableProps<O, IsMulti, G>,
) => {
  const { className, ...rest } = props;

  const joinedClassName = [className, styles.rsInput].join(' ');

  return (
    <RSCreatableSelect className={joinedClassName} noOptionsMessage={() => 'No options – type custom one'} {...rest} />
  );
};
