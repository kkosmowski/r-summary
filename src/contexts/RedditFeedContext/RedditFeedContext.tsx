import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSubreddits } from '~/contexts/SubredditsContext';

import { useFetchReddit } from '~/hooks/use-fetch-reddit';
import { useFilterData } from '~/hooks/use-filter-data';
import { PostItem, TransformedData } from '~/types/reddit';

import { markPostAsRead } from './RedditFeedContext.utils';

type RedditFeedContextValue = {
  r: string;
  data: TransformedData | undefined;
  filteredItems: PostItem[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isRefetching: boolean;
  refetch: VoidFunction;
  readPost: (postId: PostItem['id']) => void;
};

const RedditFeedContext = createContext<RedditFeedContextValue>({
  data: undefined,
  r: '',
  filteredItems: undefined,
  isLoading: true,
  isSuccess: false,
  isRefetching: false,
  refetch: () => {},
  readPost: () => {},
});

export const RedditFeedController = ({ r, children }: PropsWithChildren<{ r: string }>) => {
  const { getMerged } = useSubreddits();
  const subredditsToFetch = useMemo(() => getMerged(r), [r, getMerged]);
  const { isLoading, isSuccess, data, refetch, isRefetching } = useFetchReddit(subredditsToFetch, {
    feed: r,
  });
  const [localData, setLocalData] = useState<TransformedData | undefined>(data);
  const filteredItems = useFilterData(localData);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const readPost = useCallback((postId: PostItem['id']) => {
    setLocalData((current) => markPostAsRead(current, postId));
  }, []);

  return (
    <RedditFeedContext.Provider
      value={{
        r,
        data: localData,
        filteredItems,
        isLoading,
        isSuccess,
        isRefetching,
        refetch,
        readPost,
      }}
    >
      {children}
    </RedditFeedContext.Provider>
  );
};

export const useRedditFeed = () => {
  return useContext(RedditFeedContext);
};
