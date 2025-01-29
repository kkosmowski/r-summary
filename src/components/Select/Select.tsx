import { GroupBase } from 'react-select';
import RSSelect, { Props as SelectProps } from 'react-select';

import styles from '~/styles/reactSelectStyles.module.scss';

export const Select = <O, IsMulti extends boolean, G extends GroupBase<O>>(props: SelectProps<O, IsMulti, G>) => {
  const { className, ...rest } = props;

  const joinedClassName = [className, styles.rsInput].join(' ');

  return <RSSelect className={joinedClassName} {...rest} />;
};
