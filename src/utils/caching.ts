import { redditLsPrefix } from '~/consts/reddit.ts';

export const setData = (key: string, data: any, expireIn: number) => {
  const cache = {
    data,
    expires: new Date().getTime() + expireIn,
  };

  localStorage.setItem(redditLsPrefix + key.toLowerCase(), JSON.stringify(cache));
};

export const getData = (key: string) => {
  const currentTime = new Date().getTime();
  const string = localStorage.getItem(redditLsPrefix + key.toLowerCase());

  if (!string) {
    return null;
  }

  const { data, expires } = JSON.parse(string);

  if (currentTime > new Date(expires).getTime()) {
    return null;
  }

  return data;
};

export const clearData = (key: string) => {
  localStorage.removeItem(redditLsPrefix + key.toLowerCase());
};
