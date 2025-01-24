import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { PostsList } from '~/components/PostsList';
import { Card } from '~/components/Card';

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
    <Card>
      <div className={styles.posts}>
        <h2 className={styles.subreddit}>
          <a href={data!.subreddit.url} className={styles.link}>
            {data!.subreddit.prefixed}
          </a>
        </h2>
        <PostsList items={data!.items} />
      </div>
    </Card>
  );
};
