import { FeedFilters } from '~/components/FeedFilters';
import { TransformedData } from '~/types/reddit';
import { DeleteIcon } from '~/icons/DeleteIcon';
import { Button } from '~/components/Button';
import { RefreshIcon } from '~/icons/RefreshIcon';

import styles from '../../FeedHeader.module.scss';

type FeedHeaderProps = {
  data: TransformedData;
  onRefresh: VoidFunction;
  onFiltersClose: VoidFunction;
};

export const FeedHeaderMock = ({ data, onRefresh, onFiltersClose }: FeedHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2 className={styles.subreddit}>
          <a href={data!.subreddit.url} className={styles.link}>
            {data!.subreddit.prefixed}
          </a>
        </h2>

        <Button icon={<RefreshIcon />} color="primary" onClick={onRefresh} />
      </div>

      <div className={styles.right}>
        <FeedFilters subreddit={data.subreddit} onClose={onFiltersClose} />
        <Button icon={<DeleteIcon />} className={styles.deleteButton} color="error" />
      </div>
    </header>
  );
};
