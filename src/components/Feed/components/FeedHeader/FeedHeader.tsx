import { FeedFilters } from '~/components/FeedFilters';
import { FeedSettingsModal } from '~/components/FeedSettingsModal';
import { Tooltip } from '~/components/Tooltip';
import { MergedIcon } from '~/icons/MergedIcon';
import { SettingsIcon } from '~/icons/SettingsIcon';
import { TransformedData } from '~/types/reddit';
import { useToggle } from '~/hooks/use-toggle';
import { Button } from '~/components/Button';
import { RefreshIcon } from '~/icons/RefreshIcon';

import styles from './FeedHeader.module.scss';

type FeedHeaderProps = {
  data: TransformedData;
  onRefresh: VoidFunction;
};

export const FeedHeader = ({ data, onRefresh }: FeedHeaderProps) => {
  const { open: openSettingsModal, close: closeSettingsModal, isOpen: isSettingsModalOpen } = useToggle();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2 className={styles.subreddit}>
          {data.subreddit.isMerged && (
            <Tooltip title="This feed includes multiple subreddits">
              <MergedIcon className={styles.merged} />
            </Tooltip>
          )}
          <a href={data!.subreddit.url} className={styles.link}>
            {data!.subreddit.prefixed}
          </a>
        </h2>

        <Button icon={<RefreshIcon />} color="primary" onClick={onRefresh} />
      </div>

      <div className={styles.right}>
        <FeedFilters subreddit={data.subreddit} />
        <Button icon={<SettingsIcon />} className={styles.settingsButton} onClick={() => openSettingsModal()} />
      </div>

      <FeedSettingsModal open={isSettingsModalOpen} onClose={closeSettingsModal} />
    </header>
  );
};
