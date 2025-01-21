import { PostItem } from '~/types/reddit';

import styles from './Flair.module.scss';

const getTextColor = (color: 'light' | 'dark' | null) => {
  if (!color) return 'var(--color-fg-50)';
  return color === 'dark' ? '#000' : '#fff';
};
const getBackgroundColor = (color: string | null) => {
  return color ?? 'var(--color-bg-200)';
};

export const Flair = ({ flair }: Pick<PostItem, 'flair'>) => {
  const { text, color, backgroundColor: bgColor } = flair;

  const textColor = getTextColor(color);
  const backgroundColor = getBackgroundColor(bgColor);

  return (
    <div className={styles.badge} style={{ color: textColor, backgroundColor }}>
      {text}
    </div>
  );
};
