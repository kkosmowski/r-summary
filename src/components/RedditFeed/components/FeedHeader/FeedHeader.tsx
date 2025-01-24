import { TransformedData } from '~/types/reddit';
import { DeleteIcon } from '~/icons/DeleteIcon';

import styles from './FeedHeader.module.scss';
import { useModal } from '~/hooks/use-modal.ts';
import { DeleteFeedModal } from '~/components/DeleteFeedModal';

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

      <button className={`${styles.deleteButton} --icon --error`} onClick={() => openDeleteModal()}>
        <DeleteIcon />
      </button>

      <DeleteFeedModal subreddit={data.subreddit} open={isDeleteModalOpen} onClose={closeDeleteModal} />
    </header>
  );
};
