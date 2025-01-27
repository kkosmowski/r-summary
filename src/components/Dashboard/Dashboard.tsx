import { RedditFeed } from '~/components/RedditFeed';
import { Toolbar } from '~/components/Toolbar';
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

      <section className={styles.dashboardContainer} style={style}>
        {subreddits.map((subreddit) => (
          <RedditFeed key={subreddit} r={subreddit} />
        ))}
      </section>
    </main>
  );
};
