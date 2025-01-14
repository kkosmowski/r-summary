import styles from './Card.module.scss';
import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return <article className={styles.card}>{children}</article>;
};
