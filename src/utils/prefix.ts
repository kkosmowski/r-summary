export const prefix = (subreddit: string) => {
  if (subreddit.startsWith('r/')) return subreddit;
  return 'r/' + subreddit;
};
