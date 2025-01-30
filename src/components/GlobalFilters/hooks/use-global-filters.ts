import { useSubreddits } from '~/contexts/SubredditsContext';

export const useGlobalFilters = () => {
  const { globalFilters, filterOptions, activeFilters, setGlobalFilters, addFilterOption, saveDefaultFilters } =
    useSubreddits();

  return {
    filters: globalFilters,
    setFilters: setGlobalFilters,
    options: filterOptions,
    addOption: addFilterOption,
    activeFilters,
    saveDefaultFilters,
  };
};
