import { useCallback, useEffect, useState } from 'react';
import { RawRedditData, TransformedData } from '~/types/reddit';
import { cacheData } from '~/utils/cache-data';
import { PostItem } from '~/types/reddit';
import { getData } from '~/utils/caching';
import { useSettings } from '~/contexts/SettingsContext';
import { CACHE_TIME } from '~/consts/api.ts';

const selftext_html_start = 43;
const selftext_html_end = -33;

function htmlDecode(input: string | null) {
  if (!input) return '';
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue ?? '';
}

const prepareData = (data: RawRedditData, refetchTimeInMin = CACHE_TIME): TransformedData => {
  const transformed = {
    subreddit: {
      name: data.data.children[0].data.subreddit.toLowerCase(),
      prefixed: data.data.children[0].data.subreddit_name_prefixed.toLowerCase(),
      url: 'https://reddit.com' + data.data.children[0].data.subreddit_name_prefixed.toLowerCase(),
    },
    items: data.data.children
      .filter(({ data }) => !data.stickied)
      .map(
        ({ data }) =>
          ({
            id: data.id,
            awards: data.all_awardings,
            authorName: data.author,
            createdAt: data.created * 1000,
            title: htmlDecode(data.title),
            description: htmlDecode(data.selftext_html?.slice(selftext_html_start, selftext_html_end)),
            score: {
              ups: data.upvote_ratio * 100,
              total: data.score,
            },
            commentCount: data.num_comments,
            flair: {
              text: data.link_flair_text,
              color: data.link_flair_text_color,
              backgroundColor: data.link_flair_background_color,
            },
            link: `https://reddit.com` + data.permalink,
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

export const useFetchReddit = (r: string) => {
  const { getValue } = useSettings();
  const refetchTimeInMin = getValue('setting-data-refresh-frequency') as number;
  const [data, setData] = useState<TransformedData | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRedditData = useCallback(async (r: string) => {
    setIsLoading(true);
    setIsSuccess(false);

    const response = await fetch(`https://www.reddit.com/r/${r}/hot.json?sort=hot`);
    if (response.ok) {
      setIsSuccess(true);
    }
    const data = await response.json();

    setIsLoading(false);
    setData(prepareData(data, refetchTimeInMin));
  }, []);

  useEffect(() => {
    const cache = getData(r);

    if (cache) {
      setData(cache);
    } else {
      void fetchRedditData(r);
    }
  }, [r, fetchRedditData]);

  return {
    data,
    isSuccess,
    isLoading,
  };
};
