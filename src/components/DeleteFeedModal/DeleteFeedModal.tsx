import { ModalProps } from '~/components/Modal';
import { ConfirmationModal, type ConfirmationModalProps } from '~/components/ConfirmationModal';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { SubredditData } from '~/types/reddit.ts';

type DeleteFeedModalProps = Pick<ModalProps, 'open' | 'onClose'> & {
  subreddit: SubredditData;
};

export const DeleteFeedModal = ({ subreddit, open, onClose }: DeleteFeedModalProps) => {
  const { remove } = useSubreddits();

  const title = 'Delete feed?';
  const message = `Please confirm whether you wish to remove "${subreddit.prefixed}" feed. This operation cannot be reverted.`;
  const confirm: ConfirmationModalProps['confirm'] = {
    label: 'Delete',
    color: 'error',
  };

  const handleDelete = () => {
    remove(subreddit.name);
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
