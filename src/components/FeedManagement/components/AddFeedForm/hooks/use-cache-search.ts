import { useMemo } from 'react';

import { HOUR } from '~/consts/time';

const searchCacheLsKey = 'search-cache' as const;

const getCache = (): Record<string, { recheckOn?: number; exists: boolean }> => {
  return JSON.parse(localStorage.getItem(searchCacheLsKey) ?? 'null') ?? {};
};

const cacheToLS = (subreddit: string, exists: boolean) => {
  const searchCache = getCache();
  searchCache[subreddit] = { exists };

  if (!exists) {
    // cache the info that subreddit does not exists for 24 hours
    searchCache[subreddit].recheckOn = new Date().getTime() + 24 * HOUR;
  }

  localStorage.setItem('search-cache', JSON.stringify(searchCache));
};
export const useCacheSearch = (subreddit: string): [boolean, boolean, typeof cacheToLS] => {
  const cachedData = useMemo(() => (subreddit ? getCache()[subreddit] : null), [subreddit]);

  const isSuccess = !!cachedData?.exists && !!cachedData.recheckOn && cachedData.recheckOn >= new Date().getTime();
  const isInvalid = !!subreddit && (!cachedData || !cachedData.exists);

  return [isSuccess, isInvalid, cacheToLS];
};
