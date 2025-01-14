import { PostItem } from 'src/types/reddit';

import styles from './Score.module.scss';

type ScoreProps = {
  score: PostItem['score'];
};

export const Score = ({ score }: ScoreProps) => {
  return (
    <div className={styles.scoreContainer}>
      <span className={styles.score}>{score.total}</span>
      <span>
        (<span className={score.ups >= 90 ? styles.ups : ''}>{score.ups}%</span>)
      </span>
    </div>
  );
};
