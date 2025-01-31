import { ChangeEvent, useCallback } from 'react';
import styles from '~/components/Filters/Filters.module.scss';

import { NumberFilterProps } from '~/types/filters';

export const MinCommentsFilter = ({ filters, setFilters }: NumberFilterProps) => {
  const setValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, minComments: +e.target.value }),
    [setFilters],
  );

  return (
    <div className={styles.numberRow}>
      <label htmlFor="min-comments">Min. comments count</label>
      <input
        type="number"
        id="min-comments"
        min={0}
        value={filters.minComments}
        className={styles.numberInput}
        onChange={setValue}
      />
    </div>
  );
};
