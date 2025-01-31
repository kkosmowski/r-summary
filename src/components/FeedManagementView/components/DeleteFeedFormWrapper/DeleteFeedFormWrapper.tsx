import { useSubreddits } from '~/contexts/SubredditsContext';
import { DeleteFeedForm } from '~/components/DeleteFeedForm';
import viewStyles from '~/components/FeedManagementView/FeedManagementView.module.scss';

const deleteAll = 'delete all please';

export const DeleteFeedFormWrapper = () => {
  const { remove, removeAll } = useSubreddits();
  const headingId = 'delete-feed-management-title';

  const handleRemove = (value: string) => {
    if (value === deleteAll) {
      removeAll();
    } else {
      remove(value);
    }
  };

  return (
    <section className={viewStyles.section}>
      <hgroup>
        <h4 id={headingId}>Delete existing feed</h4>
      </hgroup>

      <span className={viewStyles.description}>
        Enter name of the feed and confirm deletion with button.{' '}
        <span className="warning">This operation cannot be reverted.</span> Type "
        <em style={{ userSelect: 'all' }}>{deleteAll}</em>" to remove all feeds at once.
      </span>

      <DeleteFeedForm deleteAll={deleteAll} labelledBy={headingId} onDelete={handleRemove} />
    </section>
  );
};
