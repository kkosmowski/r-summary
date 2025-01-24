import { RedditFeed } from '~/components/RedditFeed';
import { Toolbar } from '~/components/Toolbar';
import { useSettings } from '~/contexts/SettingsContext';
import { useSubreddits } from '~/contexts/SubredditsContext';

import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  const { getValue } = useSettings();
  const { subreddits } = useSubreddits();
  const columns = getValue('setting-columns');

  return (
    <main className={styles.main}>
      <Toolbar />

      <section className={styles.dashboardContainer} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {subreddits.map((subreddit) => (
          <RedditFeed key={subreddit} r={subreddit} />
        ))}
      </section>
    </main>
  );
};
