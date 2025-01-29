import { useCallback } from 'react';
import { useGlobalFilters } from '~/components/GlobalFilters/hooks/use-global-filters';
import { PostItem } from '~/types/reddit';

import { PickOmitInputs } from '../PickOmitInputs';

export const TypeFilters = () => {
  // todo: decouple TypeFilters from global filters
  const { filters, setFilters, options } = useGlobalFilters();

  const setPickType = useCallback(
    (newValue: string[]) => setFilters((current) => ({ ...current, pickType: newValue as PostItem['type'][] })),
    [setFilters],
  );

  const setOmitType = useCallback(
    (newValue: string[]) => setFilters((current) => ({ ...current, omitType: newValue as PostItem['type'][] })),
    [setFilters],
  );

  return (
    <PickOmitInputs
      options={options.types}
      pickValue={filters?.pickType}
      omitValue={filters?.omitType}
      pickPlaceholder="Only types"
      omitPlaceholder="Avoid types"
      onPickChange={setPickType}
      onOmitChange={setOmitType}
      makeOptionsUppercase
    />
  );
};
