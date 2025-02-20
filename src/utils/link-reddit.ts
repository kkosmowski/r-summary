import { REDDIT_URL } from '~/consts/reddit';

export const linkReddit = (subreddit: string) => {
  let prefixed = subreddit.startsWith('r/') ? subreddit : `r/${subreddit}`;
  prefixed = prefixed.toLowerCase();

  return `${REDDIT_URL}/${prefixed}`;
};
