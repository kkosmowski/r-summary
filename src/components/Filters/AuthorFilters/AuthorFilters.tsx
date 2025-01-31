import { useCallback } from 'react';

import { PickOmitFilterProps } from '~/types/filters';

import { PickOmitInputs } from '../PickOmitInputs';

export const AuthorFilters = ({ filters, options, setFilters, addOption }: PickOmitFilterProps) => {
  const setPickAuthors = useCallback(
    (newValue: string[]) => setFilters({ ...filters, pickAuthors: newValue }),
    [setFilters],
  );

  const setOmitAuthors = useCallback(
    (newValue: string[]) => setFilters({ ...filters, omitAuthors: newValue }),
    [setFilters],
  );

  const handleCreateOption = (newOption: string) => {
    addOption?.('authors', newOption);
  };

  return (
    <PickOmitInputs
      creatable
      options={options.authors}
      pickValue={filters?.pickAuthors}
      omitValue={filters?.omitAuthors}
      pickPlaceholder="Only authors"
      omitPlaceholder="Avoid authors"
      onPickChange={setPickAuthors}
      onOmitChange={setOmitAuthors}
      onCreate={handleCreateOption}
    />
  );
};
