import isEqual from 'lodash.isequal';

import { GlobalFilters } from '~/types/reddit';

import { SubredditsFilterOptions, SubredditsObject } from './SubredditsContext.types';

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
  return JSON.parse(localStorage.getItem(defaultFiltersLsKey) ?? 'null') as GlobalFilters | null;
};

export const cacheDefaultFilters = (filters: GlobalFilters) => {
  localStorage.setItem(defaultFiltersLsKey, JSON.stringify(filters));
};

export const getCachedFilterOptions = () => {
  return JSON.parse(localStorage.getItem(filterOptionsLsKey) ?? 'null');
};

export const cacheFilterOptions = (options: SubredditsFilterOptions) => {
  localStorage.setItem(filterOptionsLsKey, JSON.stringify(options));
};

export const countActiveFilters = (filters: GlobalFilters | null, defaultFilters: GlobalFilters | null) => {
  let count = 0;

  for (const filterKey in filters) {
    const key = filterKey as keyof typeof filters;

    if (!isEqual(filters?.[key], defaultFilters?.[key])) {
      count += 1;
    }
  }

  return count;
};
