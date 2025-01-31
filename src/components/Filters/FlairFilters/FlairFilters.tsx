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
      options={options.flairs}
      pickValue={filters?.pickFlairs}
      omitValue={filters?.omitFlairs}
      pickPlaceholder="Only flairs"
      omitPlaceholder="Avoid flair"
      onPickChange={setPickFlairs}
      onOmitChange={setOmitFlairs}
      onCreate={handleCreateOption}
    />
  );
};
