import { useMemo, useRef } from 'react';
import styles from '~/components/EmptyState/EmptyState.module.scss';
import { FeedMock } from '~/components/RedditFeed/components/FeedMock';
import { useIntro } from '~/contexts/IntroContext';

import { hints } from '~/components/EmptyState/EmptyState.const';
import { IntroKey } from '~/types/intro';

export const EmptyStateHints = () => {
  const { mark, isFinished } = useIntro();

  const feedMockRef = useRef<HTMLDivElement | null>(null);
  const feedMockModified = useRef(false);

  const hintsTimers = useMemo(() => {
    const timers: Partial<Record<IntroKey, number>> = {};

    hints
      .filter((hint) => !isFinished(hint.key))
      .forEach((hint, index) => {
        timers[hint.key] = index * 2 + 1;
      });

    return timers;
  }, []);

  const isFeedVisible = !isFinished('feed-filters') || !isFinished('refetch');

  const handleRefresh = () => {
    mark('refetch');
  };

  const handleFiltersClose = () => {
    mark('feed-filters');
  };

  return (
    <>
      {hints
        .filter((hint) => !isFinished(hint.key))
        .map((hint) => {
          const Icon = hint.icon;

          if (hint.key === 'refetch' || hint.key === 'feed-filters') {
            if (feedMockRef.current && !feedMockModified.current) {
              feedMockRef.current.style.animationDelay = hintsTimers[hint.key] + 's';
              feedMockModified.current = true;
            }
          }

          return (
            <div key={hint.key} className={hint.className} style={{ animationDelay: hintsTimers[hint.key] + 's' }}>
              <Icon className={hint.iconClassName} /> {hint.label}
            </div>
          );
        })}

      {isFeedVisible && (
        <div ref={feedMockRef} className={`${styles.feedMock} ${styles.animate}`}>
          <FeedMock onRefresh={handleRefresh} onFiltersClose={handleFiltersClose} />
        </div>
      )}
    </>
  );
};
