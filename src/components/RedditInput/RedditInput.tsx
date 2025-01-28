import { ChangeEvent } from 'react';

import { CheckIcon } from '~/icons/CheckIcon';

import styles from './RedditInput.module.scss';

type RedditInputProps = {
  value: string;
  isSuccess?: boolean;
  isError?: boolean;
  onChange: (value: string) => void;
};

export const RedditInput = ({ value, onChange, isSuccess, isError }: RedditInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <span className={`${styles.redditInput} ${!!isSuccess && styles.ok} ${!!isError && styles.notOk}`}>
      <input autoFocus type="text" value={value} placeholder="Enter subreddit..." onChange={handleChange} />
      {isSuccess && <CheckIcon color="success" className={styles.icon} />}
    </span>
  );
};
