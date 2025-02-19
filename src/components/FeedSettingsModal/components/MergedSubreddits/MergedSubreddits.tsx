import { useMemo } from 'react';

import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { CloseIcon } from '~/icons/CloseIcon';
import { SplitIcon } from '~/icons/SplitIcon';

import styles from './MergedSubreddits.module.scss';

export const MergedSubreddits = () => {
  const { r } = useRedditFeed();
  const { getMerged } = useSubreddits();
  const mergedSubreddits = useMemo(() => getMerged(r), [r, getMerged]);

  if (mergedSubreddits.length < 2) return null;

  return (
    <section>
      <span>Merged subreddits:</span>
      <ul>
        {mergedSubreddits.map((subreddit) => (
          <li key={subreddit}>
            <span className={styles.listItem}>
              {subreddit}
              <span className={styles.actions}>
                <Tooltip title={false && 'Split subreddit into separate feed'}>
                  <Button icon={<SplitIcon />} size="small" color="primary" disabled />
                </Tooltip>
                <Tooltip title={false && 'Delete subreddit from this feed'}>
                  <Button icon={<CloseIcon />} size="small" color="error" disabled />
                </Tooltip>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
