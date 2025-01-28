import { AddFeedForm } from '~/components/AddFeedForm';
import { useSubreddits } from '~/contexts/SubredditsContext';
import viewStyles from '~/components/FeedManagementView/FeedManagementView.module.scss';

export const AddFeedFormWrapper = () => {
  const { add } = useSubreddits();

  return (
    <section className={viewStyles.section}>
      <h4>Add new feed</h4>

      <AddFeedForm onAdd={add} />
    </section>
  );
};
