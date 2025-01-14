import { useCallback, useEffect, useState } from 'react';
import { RawRedditData, TransformedData } from 'src/types/reddit';

const prepareData = (data: RawRedditData): TransformedData => {
  return {
    subreddit: {
      name: data.data.children[0].data.subreddit,
      prefixed: data.data.children[0].data.subreddit_name_prefixed,
      url: 'https://reddit.com' + data.data.children[0].data.subreddit_name_prefixed,
    },
    items: data.data.children
      .filter(({ data }) => !data.stickied)
      .map(({ data }) => ({
        id: data.id,
        awards: data.all_awardings,
        authorName: data.author,
        createdAt: new Date(data.created * 1000),
        title: data.title,
        description: data.selftext,
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
        video: data.media?.reddit_video.fallback_url,
        type: data.post_hint === 'hosted:video' ? 'video' : data.post_hint ? 'image' : 'text',
        visited: data.visited,
      })),
  };
};

export const useFetchReddit = (r: string) => {
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
    setData(prepareData(data));
  }, []);

  useEffect(() => {
    void fetchRedditData(r);
  }, [r, fetchRedditData]);

  return {
    data,
    isSuccess,
    isLoading,
  };
};
