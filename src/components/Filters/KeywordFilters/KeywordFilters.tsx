import { useCallback } from 'react';

import { PickOmitFilterProps } from '~/types/filters';

import { PickOmitInputs } from '../PickOmitInputs';

export const KeywordFilters = ({ filters, options, setFilters, addOption }: PickOmitFilterProps) => {
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
      id="keywords"
      options={options.keywords}
      pickValue={filters?.pickKeywords}
      omitValue={filters?.omitKeywords}
      pickLabel="Only keywords"
      omitLabel="Avoid keywords"
      onPickChange={setPickKeywords}
      onOmitChange={setOmitKeywords}
      onCreate={handleCreateOption}
    />
  );
};
