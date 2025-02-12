import { FC } from 'react';
import styles from '~/components/EmptyState/EmptyState.module.scss';
import { StraightIcon } from '~/icons/StraightIcon';
import { TurnRightIcon } from '~/icons/TurnRightIcon';
import { IntroKey } from '~/types/intro';

type HintItem = {
  key: IntroKey;
  icon: FC<{ className?: string }>;
  iconClassName?: string;
  className: string;
  label: string;
};

export const hints: HintItem[] = [
  {
    key: 'manage-feeds',
    className: `${styles.manageFeed} ${styles.hint} ${styles.animate}`,
    icon: TurnRightIcon,
    iconClassName: styles.rotateLeft,
    label: 'Here you can manage your feeds',
  },
  {
    key: 'global-filters',
    className: `${styles.globalFilters} ${styles.hint} ${styles.animate}`,
    icon: StraightIcon,
    iconClassName: styles.rotateLeft,
    label: 'Click here to set global filters',
  },
  {
    key: 'settings',
    className: `${styles.settings} ${styles.hint} ${styles.column} ${styles.animate}`,
    icon: StraightIcon,
    label: 'Click here to customize the app',
  },
  {
    key: 'feed-filters',
    className: `${styles.feedFilters} ${styles.hint} ${styles.animate}`,
    icon: TurnRightIcon,
    iconClassName: styles.rotateLeftAndFlipX,
    label: 'Click here to view specific Feed filters',
  },
  {
    key: 'refetch',
    className: `${styles.refetch} ${styles.hint} ${styles.column} ${styles.animate}`,
    icon: StraightIcon,
    iconClassName: styles.flipY,
    label: 'Click here to refresh the data',
  },
];
