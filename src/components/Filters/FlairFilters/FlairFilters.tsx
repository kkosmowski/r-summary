import { useCallback } from 'react';

import { PickOmitFilterProps } from '~/types/filters';

import { PickOmitInputs } from '../PickOmitInputs';

export const FlairFilters = ({ filters, options, setFilters, addOption }: PickOmitFilterProps) => {
  const setPickFlairs = useCallback(
    (newValue: string[]) => setFilters({ ...filters, pickFlairs: newValue }),
    [setFilters],
  );

  const setOmitFlairs = useCallback(
    (newValue: string[]) => setFilters({ ...filters, omitFlairs: newValue }),
    [setFilters],
  );

  const handleCreateOption = (newOption: string) => {
    addOption?.('flairs', newOption);
  };

  return (
    <PickOmitInputs
      creatable
      id="flairs"
      options={options.flairs}
      pickValue={filters?.pickFlairs}
      omitValue={filters?.omitFlairs}
      pickLabel="Only flairs"
      omitLabel="Avoid flairs"
      onPickChange={setPickFlairs}
      onOmitChange={setOmitFlairs}
      onCreate={handleCreateOption}
    />
  );
};
