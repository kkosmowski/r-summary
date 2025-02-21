import { useCallback, useMemo, useState } from 'react';
import { Button } from '~/components/Button';

import { Select } from '~/components/Select';
import { TextField } from '~/components/TextField';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { Option } from '~/types/ui';
import { stringToOption } from '~/utils/string-to-option';

import styles from './MergeWithExistingFeed.module.scss';

type MergeWithExistingFeedProps = {
  subreddit: string;
};

const emptyOption = { value: undefined, label: undefined };

export const MergeWithExistingFeed = ({ subreddit }: MergeWithExistingFeedProps) => {
  const [selectedFeed, setSelectedFeed] = useState<string | undefined>(undefined);
  const [name, setName] = useState(subreddit);
  const { merge, subreddits } = useSubreddits();
  const remainingFeeds = useMemo(
    () => subreddits.filter((name) => name !== subreddit).map((name) => stringToOption(name)),
    [subreddit, subreddits],
  );

  const handleMerge = useCallback(() => {
    setSelectedFeed(undefined);
    merge(subreddit, selectedFeed!, { name });
  }, [subreddit, selectedFeed, name, setSelectedFeed]);

  const handleFeedChange = (value: string) => {
    setSelectedFeed(value);
  };

  return (
    <section className={styles.container}>
      <span className={styles.label}>Select existing feed to merge</span>

      <section className={styles.row}>
        <Select
          className={styles.select}
          placeholder="Choose a feed"
          value={selectedFeed ? stringToOption(selectedFeed) : emptyOption}
          options={remainingFeeds}
          onChange={(value) => handleFeedChange((value as Option).value)}
          label="Select feed"
        />

        <TextField
          label="Feed name"
          placeholder="Enter new feed name"
          value={name}
          onChange={setName}
          disabled={!selectedFeed}
        />
      </section>

      <footer className={styles.row}>
        <Button size="small" onClick={() => setName(subreddit)} disabled={!selectedFeed}>
          Keep current name
        </Button>

        <Button size="small" onClick={() => setName(selectedFeed!)} disabled={!selectedFeed}>
          Set selected feed's name
        </Button>
      </footer>

      <Button variant="filled" onClick={handleMerge} disabled={!selectedFeed}>
        Confirm merge
      </Button>
    </section>
  );
};
