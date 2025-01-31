import { ChangeEvent, useCallback } from 'react';
import styles from '~/components/Filters/Filters.module.scss';

import { NumberFilterProps } from '~/types/filters';

export const MinPointsFilter = ({ filters, setFilters }: NumberFilterProps) => {
  const setValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, minPoints: +e.target.value }),
    [setFilters],
  );

  return (
    <div className={styles.numberRow}>
      <label htmlFor="min-points">Min. points</label>
      <input
        type="number"
        id="min-points"
        min={0}
        value={filters.minPoints}
        className={styles.numberInput}
        onChange={setValue}
      />
    </div>
  );
};
