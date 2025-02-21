import { useState } from 'react';

import { Button } from '~/components/Button';
import { TextField } from '~/components/TextField';
import { Tooltip } from '~/components/Tooltip';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { prefix } from '~/utils/prefix';

import styles from './RenameFeed.module.scss';

export const RenameFeed = () => {
  const { feed } = useRedditFeed();
  const { update, getDetails } = useSubreddits();
  const subreddits = getDetails(feed);
  const [name, setName] = useState(feed);

  const canUpdate = name.trim() !== feed;
  const originalName = prefix(subreddits[0]);
  const canReset = feed !== originalName;

  return (
    <section className={styles.container}>
      <TextField label="Feed name" value={name} onChange={setName} />

      <Button variant="filled" disabled={!canUpdate} onClick={() => update(feed, { newName: name })}>
        Update
      </Button>

      {subreddits.length === 1 && (
        <Tooltip title={`Reset name to "${originalName}"`}>
          <Button disabled={!canReset} onClick={() => update(feed, { reset: true })}>
            Reset
          </Button>
        </Tooltip>
      )}
    </section>
  );
};
