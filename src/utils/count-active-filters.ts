import isEqual from 'lodash.isequal';

import { GlobalFilters } from '~/types/reddit';

const isObject = (item: unknown): item is Object => {
  return typeof item === 'object' && item !== null;
};

const isDefined = <T>(item: T | null | undefined): item is T => {
  return item !== null && item !== undefined;
};

export const countActiveFilters = (filters: GlobalFilters | null, defaultFilters: GlobalFilters | null) => {
  let count = 0;

  for (const filterKey in filters) {
    const key = filterKey as keyof typeof filters;

    if (isObject(filters?.[key]) && isObject(defaultFilters?.[key])) {
      if (!isEqual(filters[key], defaultFilters[key])) {
        count += 1;
      }
    } else if (isDefined(filters?.[key]) && isDefined(defaultFilters?.[key])) {
      if (filters[key] !== defaultFilters[key]) {
        count += 1;
      }
    }
  }

  return count;
};
