import { PostItem } from '~/types/reddit';

import styles from './Score.module.scss';

type ScoreProps = {
  score: PostItem['score'];
};

const getScoreClassName = (ups: number) => {
  if (ups >= 90) return styles.scoreGreat;
  if (ups >= 70) return styles.scoreGood;
  if (ups >= 50) return styles.scoreOk;
  return styles.scoreBad;
};

export const Score = ({ score }: ScoreProps) => {
  return (
    <div className={styles.scoreContainer}>
      <span className={styles.score}>{score.total}</span>
      <span>
        (<span className={`${styles.score} ${getScoreClassName(score.ups)}`}>{score.ups}%</span>)
      </span>
    </div>
  );
};
