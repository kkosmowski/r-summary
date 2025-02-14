import { Button } from '~/components/Button';
import { DeleteFeedModal } from '~/components/DeleteFeedModal';
import { Modal, ModalProps } from '~/components/Modal';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useToggle } from '~/hooks/use-toggle';
import { DeleteIcon } from '~/icons/DeleteIcon';

import styles from './FeedSettingsModal.module.scss';

export type FeedSettingsModalProps = Pick<ModalProps, 'open' | 'onClose'>;

export const FeedSettingsModal = (props: FeedSettingsModalProps) => {
  const { open, onClose } = props;
  const { data } = useRedditFeed();
  const { open: openDeleteModal, close: closeDeleteModal, isOpen: isDeleteModalOpen } = useToggle();

  const handleDelete = () => {
    closeDeleteModal();
    onClose?.();
  };

  return (
    <Modal open={open} title="Feed settings" onClose={onClose}>
      <section className={styles.content}>
        <p>
          Settings for <strong>{data!.subreddit.prefixed}</strong> feed:
        </p>

        <Button
          withIcon={<DeleteIcon />}
          className={styles.deleteButton}
          variant="filled"
          color="error"
          onClick={() => openDeleteModal()}
        >
          Delete feed
        </Button>
      </section>

      <DeleteFeedModal open={isDeleteModalOpen} onClose={closeDeleteModal} onAfterDelete={handleDelete} />
    </Modal>
  );
};
