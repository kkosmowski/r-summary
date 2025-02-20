import { useState } from 'react';

import { Button } from '~/components/Button';
import { TextField } from '~/components/TextField';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';

import styles from './RenameFeed.module.scss';

export const RenameFeed = () => {
  const { r } = useRedditFeed();
  const { update } = useSubreddits();
  const [name, setName] = useState(r);

  const buttonDisabled = name.trim() === r;

  return (
    <section className={styles.container}>
      <TextField label="Feed name" value={name} onChange={setName} />
      <Button variant="filled" disabled={buttonDisabled} onClick={() => update(r, name)}>
        Update
      </Button>
    </section>
  );
};
