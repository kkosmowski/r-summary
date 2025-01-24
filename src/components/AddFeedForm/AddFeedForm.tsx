import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { INPUT_DEBOUNCE } from '~/consts/common';
import { CheckIcon } from '~/icons/CheckIcon';
import { CloseIcon } from '~/icons/CloseIcon';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';

import styles from './AddFeedForm.module.scss';
import { useCacheSearch } from './hooks/use-cache-search';

type AddFeedFormProps = {
  onClose: VoidFunction;
  onAdd: (subreddit: string) => void;
};

export const AddFeedForm = ({ onClose, onAdd }: AddFeedFormProps) => {
  const [subReddit, setSubReddit] = useState('');
  const [debouncedReddit] = useDebounce(subReddit, INPUT_DEBOUNCE);
  const [isValidCache, isInvalidCache, cacheSearch] = useCacheSearch(debouncedReddit);
  const {
    hasFetched,
    isLoading,
    isSuccess: isFetchSuccess,
    refetch,
  } = useFetchReddit(debouncedReddit, { limit: 1, enabled: false });
  const isInvalidFetch = debouncedReddit && hasFetched && !isLoading && !isFetchSuccess;
  const isValidFetch = hasFetched && !isLoading && isFetchSuccess;

  const isInvalid = isInvalidCache && isInvalidFetch;
  const isSuccess = debouncedReddit && (isValidCache || isValidFetch);

  useEffect(() => {
    if (isSuccess) {
      cacheSearch(debouncedReddit, true);
    } else if (debouncedReddit && hasFetched && !isLoading) {
      cacheSearch(debouncedReddit, false);
    }
  }, [debouncedReddit, isFetchSuccess, hasFetched, isLoading]);

  useEffect(() => {
    if (debouncedReddit && !isValidCache) {
      void refetch(debouncedReddit);
    }
  }, [debouncedReddit, isValidCache, refetch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubReddit(e.target.value);
  };

  return (
    <div className={styles.container}>
      <span className={`${styles.redditInput} ${isSuccess ? styles.ok : styles.notOk}`}>
        <input autoFocus type="text" value={subReddit} placeholder="Enter subreddit..." onChange={handleChange} />
        {isSuccess && <CheckIcon color="success" className={styles.icon} />}
      </span>

      <Button icon={<CloseIcon />} color="error" onClick={() => onClose()} />

      <Button
        icon={<AddIcon />}
        color="primary"
        disabled={isLoading || !isSuccess}
        onClick={() => onAdd(debouncedReddit)}
      />

      {isInvalid && <span className={styles.errorText}>This reddit does not exist or is unavailable.</span>}
    </div>
  );
};
