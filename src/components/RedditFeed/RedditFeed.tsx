import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { PostsList } from '~/components/PostsList';
import { Card } from '~/components/Card';

import styles from './RedditFeed.module.scss';
import { FeedHeader } from '~/components/RedditFeed/components/FeedHeader/FeedHeader.tsx';

type RedditFeedProps = {
  r: string;
};

export const RedditFeed = ({ r }: RedditFeedProps) => {
  const { isLoading, isSuccess, data } = useFetchReddit(r);

  if (!data && isLoading) {
    return 'loading...';
  }

  if (!data && !isLoading && !isSuccess) {
    return 'error...';
  }

  if (!data) {
    return `[r/${r}] no data...`;
  }

  return (
    <Card>
      <div className={styles.posts}>
        <FeedHeader data={data!} />
        <PostsList items={data!.items} />
      </div>
    </Card>
  );
};
