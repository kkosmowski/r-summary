import { FeedManagement } from '~/components/FeedManagement';
import { Settings } from '~/components/Settings';

import styles from './Toolbar.module.scss';

export const Toolbar = () => {
  return (
    <header className={styles.toolbar}>
      <section className={styles.left}>
        <FeedManagement />
      </section>

      <section className={styles.right}>
        <Settings />
      </section>
    </header>
  );
};
