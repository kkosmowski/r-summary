import { EmptyState } from '~/components/EmptyState/EmptyState';
import { Feed } from 'src/components/Feed';
import { Toolbar } from '~/components/Toolbar';
import { RedditFeedController } from '~/contexts/RedditFeedContext';
import { useSettings } from '~/contexts/SettingsContext';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { getColumnsStyles } from '~/utils/get-columns-styles';

import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  const { getValue } = useSettings();
  const { subreddits } = useSubreddits();
  const columns = getValue('setting-columns') as number;
  const style = getColumnsStyles(columns);

  return (
    <main className={styles.main}>
      <Toolbar />

      {subreddits.length ? (
        <section className={styles.dashboardContainer} style={style}>
          {subreddits.map((subreddit) => (
            <RedditFeedController key={subreddit} r={subreddit}>
              <Feed />
            </RedditFeedController>
          ))}
        </section>
      ) : (
        <EmptyState />
      )}
    </main>
  );
};
