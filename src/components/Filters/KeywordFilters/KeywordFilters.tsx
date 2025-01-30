import { useCallback } from 'react';

import { FiltersProps } from '~/types/filters';

import { PickOmitInputs } from '../PickOmitInputs';

export const KeywordFilters = ({ filters, options, setFilters, addOption }: FiltersProps) => {
  const setPickKeywords = useCallback(
    (newValue: string[]) => setFilters({ ...filters, pickKeywords: newValue }),
    [setFilters],
  );

  const setOmitKeywords = useCallback(
    (newValue: string[]) => setFilters({ ...filters, omitKeywords: newValue }),
    [setFilters],
  );

  const handleCreateOption = (newOption: string) => {
    addOption?.('keywords', newOption);
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
