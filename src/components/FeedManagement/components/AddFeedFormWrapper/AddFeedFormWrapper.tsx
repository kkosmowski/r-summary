import { AddFeedForm } from '~/components/AddFeedForm';
import { Tooltip } from '~/components/Tooltip';
import { Button } from '~/components/Button';
import { CloseIcon } from '~/icons/CloseIcon';

type AddFeedFormToolbarWrapperProps = {
  onClose: VoidFunction;
  onAdd: (subreddit: string) => void;
};

export const AddFeedFormWrapper = ({ onClose, onAdd }: AddFeedFormToolbarWrapperProps) => {
  return (
    <AddFeedForm
      additionalButton={
        <Tooltip title="Cancel">
          <Button icon={<CloseIcon />} color="error" onClick={() => onClose()} />
        </Tooltip>
      }
      inputId="add-feed-toolbar"
      onAdd={onAdd}
    />
  );
};
