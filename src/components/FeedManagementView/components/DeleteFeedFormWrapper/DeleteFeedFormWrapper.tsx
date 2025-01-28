import { useSubreddits } from '~/contexts/SubredditsContext';
import { DeleteFeedForm } from '~/components/DeleteFeedForm';
import viewStyles from '~/components/FeedManagementView/FeedManagementView.module.scss';

const deleteAll = 'delete all please';

export const DeleteFeedFormWrapper = () => {
  const { remove, removeAll } = useSubreddits();

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
        <h4>Delete existing feed</h4>
      </hgroup>

      <span className={viewStyles.description}>
        Enter name of the feed and confirm deletion with button.{' '}
        <span className={viewStyles.warning}>This operation cannot be reverted.</span> Type "
        <em style={{ userSelect: 'all' }}>{deleteAll}</em>" to remove all feeds at once.
      </span>

      <DeleteFeedForm deleteAll={deleteAll} onDelete={handleRemove} />
    </section>
  );
};
