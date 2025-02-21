import { useMemo, useState } from 'react';

import { Button } from '~/components/Button';
import { DeleteSubredditModal } from '~/components/DeleteSubredditModal';
import { Tooltip } from '~/components/Tooltip';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { CloseIcon } from '~/icons/CloseIcon';
import { SplitIcon } from '~/icons/SplitIcon';
import { linkReddit } from '~/utils/link-reddit';

import styles from './FeedDetails.module.scss';

export const FeedDetails = () => {
  const { feed } = useRedditFeed();
  const { getDetails, splitFromMerged } = useSubreddits();
  const mergedSubreddits = useMemo(() => getDetails(feed), [feed, getDetails]);
  const [subredditToDelete, setSubredditToDelete] = useState('');

  if (mergedSubreddits.length === 1) {
    if (feed !== mergedSubreddits[0]) {
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

  const closeDeleteModal = () => {
    setSubredditToDelete('');
  };

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
                <Tooltip title="Split subreddit into separate feed">
                  <Button
                    icon={<SplitIcon />}
                    size="small"
                    color="primary"
                    onClick={() => splitFromMerged(feed, subreddit)}
                  />
                </Tooltip>
                <Tooltip title="Delete subreddit from this feed">
                  <Button
                    icon={<CloseIcon />}
                    size="small"
                    color="error"
                    onClick={() => setSubredditToDelete(subreddit)}
                  />
                </Tooltip>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <DeleteSubredditModal name={subredditToDelete} open={!!subredditToDelete} onClose={closeDeleteModal} />
    </section>
  );
};
