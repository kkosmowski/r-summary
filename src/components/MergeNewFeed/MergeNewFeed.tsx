import { AddFeedForm } from '~/components/AddFeedForm';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { AddIcon } from '~/icons/AddIcon';

import styles from './MergeNewFeed.module.scss';

type MergeNewFeedProps = {
  subreddit: string;
};

export const MergeNewFeed = ({ subreddit }: MergeNewFeedProps) => {
  const { merge } = useSubreddits();

  const handleMergeIntoExisting = (newSubreddit: string) => {
    merge(subreddit, newSubreddit);
  };

  const handleMergeIntoNew = (newSubreddit: string) => {
    merge(subreddit, newSubreddit, { switch: true });
  };

  return (
    <section className={styles.container}>
      <span className={styles.label}>Add a subreddit to merge with this feed</span>
      <AddFeedForm
        label="New feed"
        onAdd={handleMergeIntoExisting}
        submitTooltip={`Merge into "${subreddit}"`}
        additionalButton={(value, invalid, disabled) => (
          <Tooltip title={value && !invalid ? `Merge into "${value}"` : ''}>
            <Button icon={<AddIcon />} color="primary" disabled={disabled} onClick={() => handleMergeIntoNew(value)} />
          </Tooltip>
        )}
      />
    </section>
  );
};
