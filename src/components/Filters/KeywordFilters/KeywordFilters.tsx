import { useCallback } from 'react';
import { useGlobalFilters } from '~/components/GlobalFilters/hooks/use-global-filters';

import { PickOmitInputs } from '../PickOmitInputs';

export const KeywordFilters = () => {
  // todo: decouple KeywordFilters from global filters
  const { filters, setFilters, options, addOption } = useGlobalFilters();

  const setPickKeywords = useCallback(
    (newValue: string[]) => setFilters((current) => ({ ...current, pickKeywords: newValue })),
    [setFilters],
  );

  const setOmitKeywords = useCallback(
    (newValue: string[]) => setFilters((current) => ({ ...current, omitKeywords: newValue })),
    [setFilters],
  );

  const handleCreateOption = (newOption: string) => {
    addOption('keywords', newOption);
  };

  return (
    <PickOmitInputs
      creatable
      options={options.keywords}
      pickValue={filters?.pickKeywords}
      omitValue={filters?.omitKeywords}
      pickPlaceholder="Only keywords"
      omitPlaceholder="Avoid keywords"
      onPickChange={setPickKeywords}
      onOmitChange={setOmitKeywords}
      onCreate={handleCreateOption}
    />
  );
};
