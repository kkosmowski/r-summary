import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { INPUT_DEBOUNCE } from '~/consts/common';

import styles from './AddFeedForm.module.scss';
import { HOUR } from '~/consts/time.ts';
import { CheckIcon } from '~/icons/CheckIcon.tsx';
import { CloseIcon } from '~/icons/CloseIcon.tsx';
import { AddIcon } from '~/icons/AddIcon.tsx';

const cache: Record<string, boolean> = {};

const cacheToLS = (subreddit: string, exists: boolean) => {
  const searchCache = JSON.parse(localStorage.getItem('search-cache') ?? 'null') ?? {};

  searchCache[subreddit] = { exists };

  if (!exists) {
    // cache info that subreddit does not exists for 24 hours
    searchCache[subreddit].recheckOn = new Date().getTime() + 24 * HOUR;
  }
};

type AddFeedFormProps = {
  onClose: VoidFunction;
  onAdd: VoidFunction;
};

export const AddFeedForm = ({ onClose, onAdd }: AddFeedFormProps) => {
  const [subReddit, setSubReddit] = useState('');
  const [debouncedReddit] = useDebounce(subReddit, INPUT_DEBOUNCE);
  const isCacheSuccess = useMemo(() => cache[debouncedReddit], [debouncedReddit]);
  const {
    hasFetched,
    isLoading,
    isSuccess: isFetchSuccess,
    refetch,
  } = useFetchReddit(debouncedReddit, { limit: 1, enabled: false });
  const isSuccess = isCacheSuccess || isFetchSuccess;

  useEffect(() => {
    if (isFetchSuccess) {
      cache[debouncedReddit] = true;
      cacheToLS(debouncedReddit, true);
    } else if (hasFetched && !isLoading) {
      cache[debouncedReddit] = false;
      cacheToLS(debouncedReddit, false);
    }
  }, [debouncedReddit, isFetchSuccess]);

  useEffect(() => {
    if (debouncedReddit) {
      if (!isCacheSuccess) {
        void refetch(debouncedReddit);
      }
    }
  }, [debouncedReddit, isCacheSuccess, refetch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubReddit(value);
  };

  return (
    <div className={styles.container}>
      <span className={`${styles.redditInput} ${isSuccess ? styles.ok : styles.notOk}`}>
        <input autoFocus type="text" value={subReddit} placeholder="Enter subreddit..." onChange={handleChange} />
        {hasFetched && !isLoading && isSuccess && <CheckIcon color="success" className={styles.icon} />}
        {hasFetched && !isLoading && !isSuccess && (
          <span className={styles.errorText}>This reddit does not exist or is unavailable.</span>
        )}
        {hasFetched && !isLoading && !isSuccess && (
          <span className={styles.errorText2}>This reddit does not exist or is unavailable.</span>
        )}
      </span>
      <button className="--icon --error" onClick={() => onClose()}>
        <CloseIcon />
      </button>

      <button className="--icon --primary" onClick={() => onAdd()}>
        <AddIcon />
      </button>
    </div>
  );
};
