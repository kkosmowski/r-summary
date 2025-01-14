import { PostItem } from 'src/types/reddit';

import styles from './Flair.module.scss';

const getTextColor = (color: 'light' | 'dark') => {
  return color === 'dark' ? '#000' : '#fff';
};

export const Flair = ({ flair }: Pick<PostItem, 'flair'>) => {
  const { text, color, backgroundColor } = flair;

  const textColor = getTextColor(color);

  return (
    <div className={styles.badge} style={{ color: textColor, backgroundColor }}>
      {text}
    </div>
  );
};
