import { Card } from '~/components/Card';
import { RedditFeed } from '~/components/RedditFeed';
import { Toolbar } from '~/components/Toolbar';

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
