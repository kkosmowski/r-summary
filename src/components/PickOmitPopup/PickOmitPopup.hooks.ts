import { useCallback } from 'react';

import { useSubreddits } from '~/contexts/SubredditsContext';

import { PickOmitType } from './PickOmitPopup.types';

const getField = (action: 'pick' | 'omit', type: PickOmitType) => {
  if (action === 'pick') {
    if (type === 'flair') return 'pickFlairs' as const;
    return 'pickAuthors' as const;
  } else {
    if (type === 'flair') return 'omitFlairs' as const;
    return 'omitAuthors' as const;
  }
};

export const usePickOmit = () => {
  const { getFilters, setFilters } = useSubreddits();

  const addToFeedFilters = useCallback(
    (action: 'pick' | 'omit', text: string, type: PickOmitType, subreddit: string) => {
      const feedFilters = getFilters(subreddit);

      const field = getField(action, type);

      if (feedFilters[field]) {
        feedFilters[field].push(text);
      } else {
        feedFilters[field] = [text];
      }

      setFilters(subreddit, { ...feedFilters });
    },
    [getFilters, setFilters],
  );

  const pick = useCallback(
    (text: string, type: PickOmitType, subreddit: string) => {
      addToFeedFilters('pick', text, type, subreddit);
    },
    [addToFeedFilters],
  );

  const omit = useCallback(
    (text: string, type: PickOmitType, subreddit: string) => {
      addToFeedFilters('omit', text, type, subreddit);
    },
    [addToFeedFilters],
  );

  return { pick, omit };
};
