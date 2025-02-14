import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSubreddits } from '~/contexts/SubredditsContext';

import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { INPUT_DEBOUNCE } from '~/consts/common';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { RedditInput } from '~/components/RedditInput';
import { cn } from '~/utils/cn';
import { throttle } from '~/utils/throttle';

import { useCacheSearch } from './hooks/use-cache-search';
import styles from './AddFeedForm.module.scss';

type AddFeedFormProps = {
  additionalButton?: ReactNode;
  inputId?: string;
  label?: string;
  labelledBy?: string;
  onAdd: (subreddit: string) => void;
};

export const AddFeedForm = ({ additionalButton, inputId, label, labelledBy, onAdd }: AddFeedFormProps) => {
  const [subreddit, setSubreddit] = useState('');
  const [debouncedReddit] = useDebounce(subreddit, INPUT_DEBOUNCE);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isValidCache, isInvalidCache, cacheSearch] = useCacheSearch(debouncedReddit);
  const {
    hasFetched,
    isLoading,
    isSuccess: isFetchSuccess,
    isBlocked,
    refetch,
  } = useFetchReddit(debouncedReddit, { limit: 1, enabled: false });
  const { subreddits } = useSubreddits();
  const isInvalidFetch = debouncedReddit && hasFetched && !isLoading && !isFetchSuccess;
  const isValidFetch = hasFetched && !isLoading && isFetchSuccess;
  const isAlreadyAdded = subreddits.includes(debouncedReddit);

  const isInvalid = isInvalidCache && isInvalidFetch && !isBlocked;
  const isSuccess = !!subreddit && !!debouncedReddit && (isValidCache || isValidFetch) && !isAlreadyAdded;

  useEffect(() => {
    if (isSuccess) {
      cacheSearch(debouncedReddit, true);
    } else if (debouncedReddit && hasFetched && !isLoading) {
      cacheSearch(debouncedReddit, false);
    }
  }, [debouncedReddit, isFetchSuccess, hasFetched, isLoading]);

  useEffect(() => {
    if (debouncedReddit && !isValidCache) {
      void refetch();
    }
  }, [debouncedReddit, isValidCache, refetch]);

  const addTooltip = !debouncedReddit ? '' : !isSuccess ? 'Cannot add invalid feed' : '';

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleAdd = () => {
    onAdd(debouncedReddit);
    setSubreddit('');
    focusInput();
  };

  const handleSubmit = throttle(() => {
    if (isLoading || !isSuccess) return;
    handleAdd();
  }, 300);

  return (
    <div className={styles.container}>
      <RedditInput
        id={inputId}
        label={label}
        labelledBy={labelledBy}
        ref={inputRef}
        autoFocus
        value={subreddit}
        isSuccess={isSuccess}
        isError={!isSuccess}
        onChange={setSubreddit}
        onEnter={handleSubmit}
      />

      {additionalButton}

      <Tooltip title={addTooltip}>
        <Button icon={<AddIcon />} color="primary" disabled={isLoading || !isSuccess} onClick={handleSubmit} />
      </Tooltip>

      {isBlocked && (
        <span className={cn(styles.text, 'error')}>
          It seems you are temporarily blocked by reddit, please wait couple of minutes.
        </span>
      )}

      {isAlreadyAdded && subreddit && (
        <span className={cn(styles.text, 'error')}>This subreddit is already in your feeds.</span>
      )}
      {isInvalid && <span className={cn(styles.text, 'error')}>This subreddit does not exist or is unavailable.</span>}
    </div>
  );
};
