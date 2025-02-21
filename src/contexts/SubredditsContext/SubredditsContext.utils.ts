import { Filters, FilterOptions } from '~/types/filters';
import { renameData } from '~/utils/caching';

import { SubredditsObject } from './SubredditsContext.types';

const subredditsLsKey = 'subreddits' as const;
const filterOptionsLsKey = 'filters-options' as const;
const defaultFiltersLsKey = 'filters-default' as const;

export const cacheSubreddits = (subreddits: SubredditsObject) => {
  localStorage.setItem(subredditsLsKey, JSON.stringify(subreddits));
};

export const getSubreddits = () => {
  const data = JSON.parse(localStorage.getItem(subredditsLsKey) ?? 'null');
  if (!data) return { order: [], items: {}, details: {} };

  return data as SubredditsObject;
};

export const getDefaultGlobalFilters = () => {
  return JSON.parse(localStorage.getItem(defaultFiltersLsKey) ?? '{}') as Filters;
};

export const cacheDefaultFilters = (filters: Filters) => {
  localStorage.setItem(defaultFiltersLsKey, JSON.stringify(filters));
};

export const getCachedFilterOptions = () => {
  return JSON.parse(localStorage.getItem(filterOptionsLsKey) ?? 'null');
};

export const cacheFilterOptions = (options: FilterOptions) => {
  localStorage.setItem(filterOptionsLsKey, JSON.stringify(options));
};

export const removeSubredditHelperFn = (current: SubredditsObject, name: string) => {
  delete current.items[name];
  delete current.details[name];
  current.order = current.order.filter((subreddit) => subreddit !== name);
  return { ...current };
};

export const renameSubredditHelperFn = (
  current: SubredditsObject,
  oldName: string,
  newName: string,
  renameLsToo = false,
  reset = false,
) => {
  current.details[newName] = current.details[oldName] ?? [oldName];
  current.order = current.order.map((name) => (name === oldName ? newName : name));
  current.items[newName] = current.items[oldName];

  if (renameLsToo) {
    renameData(oldName, newName, reset);
  }
};
