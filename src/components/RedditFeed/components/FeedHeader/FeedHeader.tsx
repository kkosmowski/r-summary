import { TransformedData } from '~/types/reddit';
import { DeleteIcon } from '~/icons/DeleteIcon';
import { useModal } from '~/hooks/use-modal';
import { DeleteFeedModal } from '~/components/DeleteFeedModal';
import { Button } from '~/components/Button';

import styles from './FeedHeader.module.scss';

type FeedHeaderProps = {
  data: TransformedData;
};

export const FeedHeader = ({ data }: FeedHeaderProps) => {
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteModalOpen } = useModal();

  return (
    <header className={styles.header}>
      <h2 className={styles.subreddit}>
        <a href={data!.subreddit.url} className={styles.link}>
          {data!.subreddit.prefixed}
        </a>
      </h2>

      <Button icon={<DeleteIcon />} className={styles.deleteButton} color="error" onClick={() => openDeleteModal()} />

      <DeleteFeedModal subreddit={data.subreddit} open={isDeleteModalOpen} onClose={closeDeleteModal} />
    </header>
  );
};
