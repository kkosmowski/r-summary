import { useMemo } from 'react';

import { Select } from '~/components/Select';
import { CreatableSelect } from '~/components/CreatableSelect';
import { stringToOption } from '~/utils/string-to-option';

import styles from '../Filters.module.scss';

type BaseTypeFiltersProps = {
  options: string[];
  pickValue?: string[];
  omitValue?: string[];
  pickPlaceholder?: string;
  omitPlaceholder?: string;
  onPickChange: (value: string[]) => void;
  onOmitChange: (value: string[]) => void;
  makeOptionsUppercase?: boolean;
};

type TypeFiltersProps = BaseTypeFiltersProps &
  (
    | { creatable?: never; onCreate?: never }
    | { creatable: true; onCreate: (value: string, type: 'pick' | 'omit') => void }
  );

export const PickOmitInputs = (props: TypeFiltersProps) => {
  const {
    creatable,
    options,
    pickValue = [],
    omitValue = [],
    pickPlaceholder,
    omitPlaceholder,
    onPickChange,
    onOmitChange,
    onCreate,
    makeOptionsUppercase = false,
  } = props;
  const mapFn = (string: string) => stringToOption(string, makeOptionsUppercase);

  const pickOptions = useMemo(
    () => options.filter((option) => !omitValue.includes(option)).map(mapFn),
    [options, omitValue],
  );
  const omitOptions = useMemo(
    () => options.filter((option) => !pickValue.includes(option)).map(mapFn),
    [options, pickValue],
  );

  const Input = creatable ? CreatableSelect : Select;

  return (
    <article className={styles.pickOmitRow}>
      <Input
        isMulti
        options={pickOptions}
        placeholder={pickPlaceholder}
        value={pickValue.map(mapFn)}
        onChange={(newValue) => onPickChange(newValue.map(({ value }) => value))}
        onCreateOption={(value) => {
          onCreate?.(value, 'pick');
          onPickChange([...pickValue, value]);
        }}
        className={styles.pickOmitInput}
      />
      <Input
        isMulti
        options={omitOptions}
        placeholder={omitPlaceholder}
        value={omitValue.map(mapFn)}
        onChange={(newValue) => onOmitChange(newValue.map(({ value }) => value))}
        onCreateOption={(value) => {
          onCreate?.(value, 'omit');
          onOmitChange([...omitValue, value]);
        }}
        className={styles.pickOmitInput}
      />
    </article>
  );
};
