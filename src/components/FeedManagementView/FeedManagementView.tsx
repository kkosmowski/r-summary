import { LayoutManagerWrapper } from './components/LayoutManager';
import { AddFeedFormWrapper } from './components/AddFeedFormWrapper';
import { DeleteFeedFormWrapper } from './components/DeleteFeedFormWrapper';

import styles from './FeedManagementView.module.scss';

export const FeedManagementView = () => {
  return (
    <section className={styles.managementView}>
      <AddFeedFormWrapper />
      <DeleteFeedFormWrapper />
      <LayoutManagerWrapper />
    </section>
  );
};
