import { useCallback, useEffect, useState } from 'react';

import { RawRedditData, TransformedData } from '~/types/reddit';
import { cacheData } from '~/utils/cache-data';
import { PostItem } from '~/types/reddit';
import { getData } from '~/utils/caching';
import { useSettings } from '~/contexts/SettingsContext';
import { CACHE_TIME } from '~/consts/api';
import { REDDIT_URL } from '~/consts/reddit';
import { htmlDecode } from '~/utils/html-decode';

const selftext_html_start = 43;
const selftext_html_end = -33;

const prepareData = (
  data: RawRedditData,
  refetchTimeInMin = CACHE_TIME,
  oldData?: TransformedData | undefined,
): TransformedData => {
  const transformed = {
    subreddit: {
      name: data.data.children[0].data.subreddit.toLowerCase(),
      prefixed: data.data.children[0].data.subreddit_name_prefixed.toLowerCase(),
      url: `${REDDIT_URL}/${data.data.children[0].data.subreddit_name_prefixed.toLowerCase()}`,
    },
    items: data.data.children
      .filter(({ data }) => !data.stickied)
      .map(
        ({ data }) =>
          ({
            id: data.id,
            isNew: !oldData?.items.some((post) => post.id === data.id),
            isRead: !!oldData?.items.filter((post) => post.id === data.id)[0]?.isRead,
            awards: data.all_awardings,
            authorName: data.author,
            createdAt: data.created * 1000,
            title: htmlDecode(data.title),
            description: htmlDecode(data.selftext_html?.slice(selftext_html_start, selftext_html_end)),
            score: {
              ups: Math.round(data.upvote_ratio * 100),
              total: data.score,
            },
            commentCount: data.num_comments,
            flair: {
              text: data.link_flair_text,
              color: data.link_flair_text_color,
              backgroundColor: data.link_flair_background_color,
            },
            link: REDDIT_URL + data.permalink,
            thumbnail: {
              url: data.thumbnail,
              width: data.thumbnail_width,
              height: data.thumbnail_height,
            },
            video: data.media?.reddit_video?.fallback_url,
            type: data.post_hint === 'hosted:video' ? 'video' : data.post_hint ? 'image' : 'text',
            visited: data.visited,
          }) satisfies PostItem,
      ),
  };

  cacheData(transformed, refetchTimeInMin);
  return transformed;
};

type Options = {
  limit?: number;
  enabled?: boolean;
};

export const useFetchReddit = (r: string, options?: Options) => {
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

  const fetchRedditData = useCallback(
    async (refetch?: boolean) => {
      setIsLoading(true);
      if (refetch) setIsRefetching(true);
      setIsSuccess(false);
      setIsBlocked(false);

      try {
        const response = await fetch(`${REDDIT_URL}/r/${r}/hot.json?sort=hot`);
        if (!response.ok) {
          finishFetch();
          return;
        }

        if (response.status === 429) {
          setIsBlocked(true);
        }

        const newData: RawRedditData = await response.json();

        const hasAnyData = newData.data.children.length > 0;

        setIsSuccess(hasAnyData);

        if (hasAnyData) {
          setData((current) => prepareData(newData, refetchTimeInMin, current));
        }

        finishFetch(refetch);
      } catch (error) {}
    },
    [r],
  );

  const refetch = useCallback(() => {
    void fetchRedditData(true);
  }, [r, fetchRedditData]);

  useEffect(() => {
    const cache = getData(r);

    if (cache) {
      setData(cache);
    } else if (enabled) {
      void fetchRedditData();
    }
  }, [r, fetchRedditData]);

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
