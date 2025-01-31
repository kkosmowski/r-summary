import { ChangeEvent, KeyboardEvent, forwardRef } from 'react';

import { CheckIcon } from '~/icons/CheckIcon';

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

export const RedditInput = forwardRef<HTMLInputElement, RedditInputProps>(
  ({ value, id, label, labelledBy, autoFocus, onChange, onEnter, isSuccess, isError }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        onEnter?.();
      }
    };

    return (
      <span className={`${styles.redditInput} ${!!isSuccess && styles.ok} ${!!isError && styles.notOk}`}>
        <div className={styles.inputWrapper}>
          {!labelledBy && label && (
            <label htmlFor={id} className="overlay-label">
              {label}
            </label>
          )}
          <input
            autoFocus={autoFocus}
            id={id}
            name="reddit-input"
            ref={ref}
            type="text"
            value={value}
            placeholder="Enter subreddit..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-labelledby={labelledBy}
          />
        </div>
        {isSuccess && <CheckIcon color="success" className={styles.icon} />}
      </span>
    );
  },
);
