import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { INPUT_DEBOUNCE } from '~/consts/common';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { RedditInput } from '~/components/RedditInput';

import { useCacheSearch } from './hooks/use-cache-search';
import styles from './AddFeedForm.module.scss';

type AddFeedFormProps = {
  additionalButton?: ReactNode;
  onAdd: (subreddit: string) => void;
};

export const AddFeedForm = ({ additionalButton, onAdd }: AddFeedFormProps) => {
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
  const isInvalidFetch = debouncedReddit && hasFetched && !isLoading && !isFetchSuccess;
  const isValidFetch = hasFetched && !isLoading && isFetchSuccess;

  const isInvalid = isInvalidCache && isInvalidFetch && !isBlocked;
  const isSuccess = !!debouncedReddit && (isValidCache || isValidFetch);

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

  const handleEnter = () => {
    if (!debouncedReddit || isLoading || !isSuccess) return;
    handleAdd();
  };

  const handleAdd = () => {
    onAdd(debouncedReddit);
    setSubreddit('');
    focusInput();
  };

  return (
    <div className={styles.container}>
      <RedditInput
        ref={inputRef}
        autoFocus
        value={subreddit}
        isSuccess={isSuccess}
        isError={!isSuccess}
        onChange={setSubreddit}
        onEnter={handleEnter}
      />

      {additionalButton}

      <Tooltip title={addTooltip}>
        <Button icon={<AddIcon />} color="primary" disabled={isLoading || !isSuccess} onClick={handleAdd} />
      </Tooltip>

      {isBlocked && (
        <span className={`${styles.text} error`}>
          It seems you are temporarily blocked by reddit, please wait couple of minutes.
        </span>
      )}
      {isInvalid && <span className={`${styles.text} error`}>This reddit does not exist or is unavailable.</span>}
    </div>
  );
};
