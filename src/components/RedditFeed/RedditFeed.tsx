import { useFetchReddit } from 'src/hooks/use-fetch-reddit';
import { PostsList } from 'src/components/PostsList';

import styles from './RedditFeed.module.scss';

type RedditFeedProps = {
  r: string;
};

export const RedditFeed = ({ r }: RedditFeedProps) => {
  const { isLoading, isSuccess, data } = useFetchReddit(r);

  if (!data && isLoading) {
    return 'loading...';
  }

  if (!data && !isSuccess) {
    return 'error...';
  }

  if (!data) {
    return `[${r}] no data...`;
  }

  return (
    <div className={styles.posts}>
      <h2 className={styles.subreddit}>
        <a href={data!.subreddit.url} className={styles.link}>
          {data!.subreddit.prefixed}
        </a>
      </h2>
      <PostsList items={data!.items} />
    </div>
  );
};
