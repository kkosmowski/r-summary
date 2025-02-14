import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { PostsList } from '~/components/PostsList';
import { Card } from '~/components/Card';

import { FeedHeader } from './components/FeedHeader';
import { LoadingOverlay } from './components/LoadingOverlay';
import styles from './Feed.module.scss';

export const Feed = () => {
  const { isLoading, isSuccess, data, r, filteredItems, refetch, isRefetching } = useRedditFeed();

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
        <PostsList items={filteredItems!} />
      </div>

      {isRefetching && <LoadingOverlay />}
    </Card>
  );
};
