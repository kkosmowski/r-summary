import { forwardRef } from 'react';

import { TextField } from '~/components/TextField';

import styles from './RedditInput.module.scss';

type RedditInputProps = {
  value: string;
  id?: string;
  label?: string;
  labelledBy?: string;
  autoFocus?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  onChange: (value: string) => void;
  onEnter?: VoidFunction;
};

export const RedditInput = forwardRef<HTMLInputElement, RedditInputProps>((props, ref) => {
  return (
    <TextField
      ref={ref}
      className={styles.inputWrapper}
      name="reddit-input"
      placeholder="Enter subreddit..."
      {...props}
    />
  );
});
