import { ReactNode, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { INPUT_DEBOUNCE } from '~/consts/common';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { RedditInput } from '~/components/RedditInput';
import { DeleteIcon } from '~/icons/DeleteIcon';
import { useSubreddits } from '~/contexts/SubredditsContext';

import styles from './DeleteFeedForm.module.scss';

type DeleteFeedFormProps = {
  deleteAll: string;
  additionalButton?: ReactNode;
  labelledBy?: string;
  onDelete: (subreddit: string) => void;
};

export const DeleteFeedForm = ({ additionalButton, deleteAll, labelledBy, onDelete }: DeleteFeedFormProps) => {
  const { subreddits } = useSubreddits();
  const [subreddit, setSubreddit] = useState('');
  const [debouncedReddit] = useDebounce(subreddit, INPUT_DEBOUNCE);

  const isDeleteAll = debouncedReddit === deleteAll;
  const isValidName = (!!subreddit && !!debouncedReddit && subreddits.includes(subreddit)) || isDeleteAll;
  const isInvalid = !!subreddit && !!debouncedReddit && !subreddits.includes(subreddit) && !isDeleteAll;

  const addTooltip = !debouncedReddit ? '' : isInvalid ? 'Cannot remove feed that is not added' : '';

  const handleDelete = () => {
    onDelete(debouncedReddit);
    setSubreddit('');
  };

  return (
    <div className={styles.container}>
      <RedditInput
        labelledBy={labelledBy}
        value={subreddit}
        isSuccess={isValidName}
        isError={isInvalid}
        onChange={setSubreddit}
      />

      {additionalButton}

      {isDeleteAll && (
        <span className={`${styles.text} warning`}>Warning: You are about to delete all of your feeds.</span>
      )}

      <Tooltip title={addTooltip}>
        <Button icon={<DeleteIcon />} color="error" disabled={isInvalid || !debouncedReddit} onClick={handleDelete} />
      </Tooltip>

      {isInvalid && <span className={`${styles.text} error`}>This subreddit is not in your feeds.</span>}
    </div>
  );
};
