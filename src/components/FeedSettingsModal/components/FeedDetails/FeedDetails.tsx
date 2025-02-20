import { useMemo } from 'react';

import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { CloseIcon } from '~/icons/CloseIcon';
import { SplitIcon } from '~/icons/SplitIcon';
import { linkReddit } from '~/utils/link-reddit';

import styles from './FeedDetails.module.scss';

export const FeedDetails = () => {
  const { r } = useRedditFeed();
  const { getMerged } = useSubreddits();
  const mergedSubreddits = useMemo(() => getMerged(r), [r, getMerged]);

  if (mergedSubreddits.length === 1) {
    if (r !== mergedSubreddits[0]) {
      return (
        <span>
          Feed contains posts from{' '}
          <a href={linkReddit(mergedSubreddits[0])} className={styles.subreddit}>
            r/{mergedSubreddits[0]}
          </a>
        </span>
      );
    }

    return null;
  }

  return (
    <section>
      <span>Merged subreddits:</span>
      <ul>
        {mergedSubreddits.map((subreddit) => (
          <li key={subreddit}>
            <span className={styles.listItem}>
              <a href={linkReddit(subreddit)} className={styles.subreddit}>
                r/{subreddit}
              </a>
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
