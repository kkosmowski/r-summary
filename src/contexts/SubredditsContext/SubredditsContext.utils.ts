import { GlobalFilters } from '~/types/reddit';

import { SubredditsObject } from './SubredditsContext.types';

const subredditsLsKey = 'subreddits' as const;
const filtersLsKey = 'filters' as const;

export const cacheSubreddits = (subreddits: SubredditsObject) => {
  localStorage.setItem(subredditsLsKey, JSON.stringify(subreddits));
};

export const getSubreddits = () => {
  const data = JSON.parse(localStorage.getItem(subredditsLsKey) ?? 'null');
  if (!data) return { order: [], items: {} };

  return data as SubredditsObject;
};

export const getDefaultFilters = () => {
  const data = JSON.parse(localStorage.getItem(filtersLsKey) ?? 'null');
  if (!data) return { omitType: [], pickType: [], omitKeywords: [], pickKeywords: [] };

  return data as GlobalFilters;
};
