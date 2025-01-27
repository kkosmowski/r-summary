import { LayoutManagerWrapper } from './components/LayoutManager';
import styles from './FeedManagementView.module.scss';

export const FeedManagementView = () => {
  return (
    <section className={styles.managementView}>
      <LayoutManagerWrapper />
    </section>
  );
};
