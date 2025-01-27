import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { PostsList } from '~/components/PostsList';
import { Card } from '~/components/Card';

import { FeedHeader } from './components/FeedHeader';
import { LoadingOverlay } from './components/LoadingOverlay';
import styles from './RedditFeed.module.scss';

type RedditFeedProps = {
  r: string;
};

export const RedditFeed = ({ r }: RedditFeedProps) => {
  const { isLoading, isSuccess, data, refetch, isRefetching } = useFetchReddit(r);

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
        <FeedHeader data={data!} onRefresh={refetch} />
        <PostsList items={data!.items} />
      </div>

      {isRefetching && <LoadingOverlay />}
    </Card>
  );
};
