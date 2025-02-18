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

const getDataFromLocalStorage = (key: string) => {
  const string = localStorage.getItem(redditLsPrefix + key.toLowerCase());

  if (!string) {
    return null;
  }

  const { data, expires }: { data: TransformedData; expires: number } = JSON.parse(string);
  return { data, expires };
};

export const updateData = (data: TransformedData) => {
  const result = getDataFromLocalStorage(data.subreddit.name);

  if (!result) return null;
  const { expires } = result;

  const cache = { data, expires };
  localStorage.setItem(redditLsPrefix + data.subreddit.name.toLowerCase(), JSON.stringify(cache));
};

export const getData = (key: string | undefined, force = false): TransformedData | null => {
  if (!key) return null;

  const currentTime = new Date().getTime();
  const result = getDataFromLocalStorage(key);

  if (!result) return null;
  const { data, expires } = result;

  if (currentTime > new Date(expires).getTime() && !force) {
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

export const invalidateData = (key: string) => {
  const string = localStorage.getItem(redditLsPrefix + key.toLowerCase());

  if (!string) return;

  localStorage.setItem(redditLsPrefix + key.toLowerCase(), string.replace(/"expires":\d+/g, '"expires":0'));
};

export const clearData = (key: string) => {
  localStorage.removeItem(redditLsPrefix + key.toLowerCase());
};

export const clearAllData = (keys: string[]) => {
  for (const key of keys) {
    clearData(key);
  }
};
