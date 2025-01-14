import { Card } from 'src/components/Card';
import { RedditFeed } from 'src/components/RedditFeed';

import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  return (
    <section className={styles.dashboardContainer}>
      <Card>
        <RedditFeed r="witcher" />
      </Card>
    </section>
  );
};
