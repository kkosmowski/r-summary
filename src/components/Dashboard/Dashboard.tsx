import { Card } from 'src/components/Card';
import { RedditFeed } from 'src/components/RedditFeed';
import { Toolbar } from 'src/components/Toolbar';

import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  return (
    <main className={styles.main}>
      <Toolbar />
      <section className={styles.dashboardContainer}>
        <Card>
          <RedditFeed r="witcher" />
        </Card>
        <Card>
          <RedditFeed r="frontend" />
        </Card>
        <Card>
          <RedditFeed r="frankocean" />
        </Card>
      </section>
    </main>
  );
};
