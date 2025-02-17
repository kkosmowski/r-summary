import { useCallback, useEffect, useState } from 'react';

import { RawRedditData, TransformedData } from '~/types/reddit';
import { getData } from '~/utils/caching';
import { useSettings } from '~/contexts/SettingsContext';
import { REDDIT_URL } from '~/consts/reddit';

import { prepareData } from './use-fetch-reddit.utils';
import { UseFetchRedditOptions } from './use-fetch-reddit.types';

export const useFetchReddit = (subreddits: string | string[], options?: UseFetchRedditOptions) => {
  const enabled = options?.enabled !== false;
  const { getValue } = useSettings();
  const refetchTimeInMin = getValue('setting-data-refresh-frequency') as number;
  const [data, setData] = useState<TransformedData | undefined>();
  const [hasFetched, setHasFetched] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const finishFetch = (refetch?: boolean) => {
    setIsLoading(false);
    if (refetch) setIsRefetching(false);
    setHasFetched(true);
  };

  const fetchSubreddit = useCallback(async (subreddit: string) => {
    setIsBlocked(false);

    const response = await fetch(`${REDDIT_URL}/r/${subreddit}/hot.json?sort=hot`);
    if (!response.ok) {
      return;
    }

    if (response.status === 429) {
      setIsBlocked(true);
    }

    const newData: RawRedditData = await response.json();

    const hasAnyData = newData.data.children.length > 0;

    setIsSuccess(hasAnyData);

    return newData;
  }, []);

  const fetchData = useCallback(
    async (isRefetch?: boolean) => {
      setIsLoading(true);
      if (isRefetch) setIsRefetching(true);
      setIsSuccess(false);

      const params = { refetchTimeInMin, isRefetch, options };

      try {
        if (Array.isArray(subreddits)) {
          const rawData: Record<string, RawRedditData> = {};

          for (const subreddit of subreddits) {
            const subredditData = await fetchSubreddit(subreddit);

            if (subredditData) rawData[subreddit] = subredditData;
          }

          setData((current) => prepareData({ rawData, oldData: current, ...params }));
        } else {
          const rawData = await fetchSubreddit(subreddits);

          if (rawData) {
            setData((current) => prepareData({ rawData: { [subreddits]: rawData }, oldData: current, ...params }));
          }
        }
      } catch (error) {}

      finishFetch(isRefetch);
    },
    [subreddits, options?.feed],
  );

  const refetch = useCallback(() => {
    void fetchData(true);
  }, [subreddits, fetchData]);

  useEffect(() => {
    const r = (options?.feed ?? Array.isArray(subreddits)) ? subreddits[0] : subreddits;
    const cache = getData(r);

    if (cache) {
      setData(cache);
    } else if (enabled) {
      void fetchData();
    }
  }, [options?.feed, subreddits, fetchData]);

  return {
    data,
    isSuccess,
    isLoading,
    isBlocked,
    isRefetching,
    hasFetched,
    refetch,
  };
};
