import { redditLsPrefix } from '~/consts/reddit.ts';
import { TransformedData } from '~/types/reddit';
import { htmlDecode } from '~/utils/html-decode';

export const setData = (key: string, data: any, expireIn: number) => {
  const cache = {
    data,
    expires: new Date().getTime() + expireIn,
  };

  localStorage.setItem(redditLsPrefix + key.toLowerCase(), JSON.stringify(cache));
};

export const getData = (key: string): TransformedData | null => {
  const currentTime = new Date().getTime();
  const string = localStorage.getItem(redditLsPrefix + key.toLowerCase());

  if (!string) {
    return null;
  }

  const { data, expires }: { data: TransformedData; expires: number } = JSON.parse(string);

  if (currentTime > new Date(expires).getTime()) {
    return null;
  }
  return {
    subreddit: data.subreddit,
    items: data.items.map((post) => ({
      ...post,
      title: htmlDecode(post.title),
      description: htmlDecode(post.description),
    })),
  };
};

export const clearData = (key: string) => {
  localStorage.removeItem(redditLsPrefix + key.toLowerCase());
};

export const clearAllData = (keys: string[]) => {
  for (const key of keys) {
    clearData(key);
  }
};
