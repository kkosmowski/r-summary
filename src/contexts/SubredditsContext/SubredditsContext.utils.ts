import { FilterOptions } from '~/types/filters';
import { GlobalFilters } from '~/types/reddit';

import { SubredditsObject } from './SubredditsContext.types';

const subredditsLsKey = 'subreddits' as const;
const filterOptionsLsKey = 'filters-options' as const;
const defaultFiltersLsKey = 'filters-default' as const;

export const cacheSubreddits = (subreddits: SubredditsObject) => {
  localStorage.setItem(subredditsLsKey, JSON.stringify(subreddits));
};

export const getSubreddits = () => {
  const data = JSON.parse(localStorage.getItem(subredditsLsKey) ?? 'null');
  if (!data) return { order: [], items: {} };

  return data as SubredditsObject;
};

export const getDefaultGlobalFilters = () => {
  return JSON.parse(localStorage.getItem(defaultFiltersLsKey) ?? '{}') as GlobalFilters;
};

export const cacheDefaultFilters = (filters: GlobalFilters) => {
  localStorage.setItem(defaultFiltersLsKey, JSON.stringify(filters));
};

export const getCachedFilterOptions = () => {
  return JSON.parse(localStorage.getItem(filterOptionsLsKey) ?? 'null');
};

export const cacheFilterOptions = (options: FilterOptions) => {
  localStorage.setItem(filterOptionsLsKey, JSON.stringify(options));
};
