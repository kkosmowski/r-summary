import { ChangeEvent, useCallback } from 'react';

import { NumberFilterProps } from '~/types/filters';

import styles from '../Filters.module.scss';

export const MinThresholdFilter = ({ filters, setFilters }: NumberFilterProps) => {
  const setValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, minThreshold: +e.target.value }),
    [setFilters],
  );

  return (
    <div className={styles.numberRow}>
      <label htmlFor="min-threshold">Min. % threshold</label>
      <input
        type="number"
        id="min-threshold"
        min={0}
        max={100}
        value={filters.minThreshold}
        className={styles.numberInput}
        onChange={setValue}
      />
    </div>
  );
};
