import { Button } from '~/components/Button';
import { StraightIcon } from '~/icons/StraightIcon';
import { useIntro } from '~/contexts/IntroContext';

import styles from './EmptyState.module.scss';
import { EmptyStateHints } from './components/EmptyStateHints/EmptyStateHints';

export const EmptyState = () => {
  const { onlyAddLeft, introCompleted, isFinished, finishAll } = useIntro();

  return (
    <section className={styles.emptyState}>
      <h3 className={styles.title}>There is nothing to display yet.</h3>

      {!isFinished('add-feed') && onlyAddLeft && (
        <div className={`${styles.addFeed} ${styles.hint} ${styles.column} ${styles.animate}`}>
          <StraightIcon /> Click here to create your first Feed
        </div>
      )}

      <EmptyStateHints />

      {!introCompleted && !onlyAddLeft && (
        <div className={styles.skip}>
          <Button variant="filled" onClick={finishAll}>
            click here
          </Button>{' '}
          to skip the intro
        </div>
      )}
    </section>
  );
};
