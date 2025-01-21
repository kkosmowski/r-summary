import { Card } from '~/components/Card';
import { RedditFeed } from '~/components/RedditFeed';
import { Toolbar } from '~/components/Toolbar';

import styles from './Dashboard.module.scss';
import { useSettings } from '~/contexts/SettingsContext';

export const Dashboard = () => {
  const { getValue } = useSettings();
  const columns = getValue('setting-columns');

  return (
    <main className={styles.main}>
      <Toolbar />
      <section className={styles.dashboardContainer} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        <Card>
          <RedditFeed r="witcher" />
        </Card>
        <Card>
          <RedditFeed r="frontend" />
        </Card>
        <Card>
          <RedditFeed r="metalcore" />
        </Card>
        <Card>
          <RedditFeed r="cyberpunkgame" />
        </Card>
        <Card>
          <RedditFeed r="frankocean" />
        </Card>
        <Card>
          <RedditFeed r="gakinotsukai" />
        </Card>
        <Card>
          <RedditFeed r="science" />
        </Card>
      </section>
    </main>
  );
};
