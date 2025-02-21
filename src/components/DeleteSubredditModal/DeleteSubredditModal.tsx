import { ModalProps } from '~/components/Modal';
import { ConfirmationModal, type ConfirmationModalProps } from '~/components/ConfirmationModal';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';

type DeleteSubredditModalProps = Pick<ModalProps, 'open' | 'onClose'> & {
  name: string;
  onAfterDelete?: VoidFunction;
};

export const DeleteSubredditModal = ({ open, name, onClose }: DeleteSubredditModalProps) => {
  const { removeFromMerged } = useSubreddits();
  const { data } = useRedditFeed();

  const title = 'Delete feed?';
  const message = (
    <>
      Please confirm whether you wish to remove "{name}" subreddit from "{data!.subreddit.prefixed}".
      <br />
      <span className="warning">This operation cannot be reverted</span>.
    </>
  );
  const confirm: ConfirmationModalProps['confirm'] = {
    label: 'Delete',
    color: 'error',
  };

  const handleDelete = () => {
    removeFromMerged(data!.subreddit.name, name);
    onClose?.();
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
