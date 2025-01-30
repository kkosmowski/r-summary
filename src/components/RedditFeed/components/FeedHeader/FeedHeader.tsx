import { FeedFilters } from '~/components/FeedFilters';
import { TransformedData } from '~/types/reddit';
import { DeleteIcon } from '~/icons/DeleteIcon';
import { useModal } from '~/hooks/use-modal';
import { DeleteFeedModal } from '~/components/DeleteFeedModal';
import { Button } from '~/components/Button';
import { RefreshIcon } from '~/icons/RefreshIcon';

import styles from './FeedHeader.module.scss';

type FeedHeaderProps = {
  data: TransformedData;
  onRefresh: VoidFunction;
};

export const FeedHeader = ({ data, onRefresh }: FeedHeaderProps) => {
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteModalOpen } = useModal();

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
        <FeedFilters subreddit={data.subreddit} />
        <Button icon={<DeleteIcon />} className={styles.deleteButton} color="error" onClick={() => openDeleteModal()} />
      </div>

      <DeleteFeedModal subreddit={data.subreddit} open={isDeleteModalOpen} onClose={closeDeleteModal} />
    </header>
  );
};
