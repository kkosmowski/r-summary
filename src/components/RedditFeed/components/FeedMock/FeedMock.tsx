import { Card } from '~/components/Card';
import { PostsList } from '~/components/PostsList';
import { exampleSubreddit } from '~/consts/mock';
import { FeedHeaderMock } from '~/components/RedditFeed/components/FeedHeader/components/FeedHeaderMock';

import styles from '../../RedditFeed.module.scss';

type FeedMockProps = {
  onRefresh: VoidFunction;
  onFiltersClose: VoidFunction;
};

export const FeedMock = ({ onRefresh, onFiltersClose }: FeedMockProps) => {
  return (
    <Card>
      <div className={styles.posts}>
        <FeedHeaderMock data={exampleSubreddit} onRefresh={onRefresh} onFiltersClose={onFiltersClose} />
        <PostsList items={exampleSubreddit.items} />
      </div>
    </Card>
  );
};
