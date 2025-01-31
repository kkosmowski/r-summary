import { useCallback } from 'react';

import { PostItem } from '~/types/reddit';
import { PickOmitFilterProps } from '~/types/filters';

import { PickOmitInputs } from '../PickOmitInputs';

export const TypeFilters = ({ filters, options, setFilters }: PickOmitFilterProps) => {
  const setPickType = useCallback(
    (newValue: string[]) => setFilters({ ...filters, pickType: newValue as PostItem['type'][] }),
    [setFilters],
  );

  const setOmitType = useCallback(
    (newValue: string[]) => setFilters({ ...filters, omitType: newValue as PostItem['type'][] }),
    [setFilters],
  );

  return (
    <PickOmitInputs
      id="types"
      options={options.types}
      pickValue={filters?.pickType}
      omitValue={filters?.omitType}
      pickLabel="Only types"
      omitLabel="Avoid types"
      onPickChange={setPickType}
      onOmitChange={setOmitType}
      makeOptionsUppercase
    />
  );
};
