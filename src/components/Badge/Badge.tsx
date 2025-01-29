import { PropsWithChildren } from 'react';

import styles from './Badge.module.scss';

export const Badge = ({ label, children }: PropsWithChildren<{ label: string | number }>) => {
  if (!label) return children;

  return (
    <span className={styles.wrapper}>
      {children}
      <div className={styles.badge}>{label}</div>
    </span>
  );
};
