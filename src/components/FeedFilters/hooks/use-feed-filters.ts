import { useCallback, useMemo } from 'react';
import { defaultFeedFilters } from '~/consts/filters';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { Filters } from '~/types/filters';
import { countActiveFilters } from '~/utils/count-active-filters';

export const useFeedFilters = (subredditName: string) => {
  const { getFilters, filterOptions, setFilters: setFeedFilters, addFilterOption } = useSubreddits();
  const filters = getFilters(subredditName);
  const activeFilters = useMemo(() => countActiveFilters(filters, defaultFeedFilters), [filters]);

  const setFilters = useCallback(
    (newFilters: Filters) => {
      setFeedFilters(subredditName, newFilters);
    },
    [filters, subredditName],
  );

  const clearFilters = useCallback(() => {
    setFeedFilters(subredditName, defaultFeedFilters);
  }, [subredditName]);

  return {
    filters,
    activeFilters,
    options: filterOptions,
    addOption: addFilterOption,
    setFilters,
    clearFilters,
  };
};
