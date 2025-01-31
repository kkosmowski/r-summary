import { AddFeedForm } from '~/components/AddFeedForm';
import { useSubreddits } from '~/contexts/SubredditsContext';
import viewStyles from '~/components/FeedManagementView/FeedManagementView.module.scss';

export const AddFeedFormWrapper = () => {
  const { add } = useSubreddits();
  const headingId = 'add-feed-management-title';

  return (
    <section className={viewStyles.section}>
      <h4 id={headingId}>Add new feed</h4>

      <AddFeedForm labelledBy={headingId} onAdd={add} />
    </section>
  );
};
