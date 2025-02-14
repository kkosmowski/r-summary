import { ModalProps } from '~/components/Modal';
import { ConfirmationModal, type ConfirmationModalProps } from '~/components/ConfirmationModal';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';

type DeleteFeedModalProps = Pick<ModalProps, 'open' | 'onClose'> & {
  onAfterDelete?: VoidFunction;
};

export const DeleteFeedModal = ({ open, onClose, onAfterDelete }: DeleteFeedModalProps) => {
  const { remove } = useSubreddits();
  const { data } = useRedditFeed();

  const title = 'Delete feed?';
  const message = (
    <>
      Please confirm whether you wish to remove "{data!.subreddit.prefixed}" feed.{' '}
      <span className="warning">This operation cannot be reverted</span>.
    </>
  );
  const confirm: ConfirmationModalProps['confirm'] = {
    label: 'Delete',
    color: 'error',
  };

  const handleDelete = () => {
    remove(data!.subreddit.name);
    onAfterDelete?.();
  };

  return (
    <ConfirmationModal
      open={open}
      title={title}
      message={message}
      confirm={confirm}
      onConfirm={handleDelete}
      onClose={onClose}
    />
  );
};
