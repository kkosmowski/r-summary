import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { FeedFilters, GlobalFilters } from '~/types/reddit';
import { clearAllData, clearData } from '~/utils/caching';

import { SubredditsFilterOptions, SubredditsObject } from './SubredditsContext.types';
import { cacheSubreddits, getDefaultFilters, getSubreddits } from './SubredditsContext.utils';

type SubredditsContextValue = {
  subreddits: string[];
  globalFilters: GlobalFilters | null;
  filterOptions: SubredditsFilterOptions;
  add: (name: string) => void;
  remove: (name: string) => void;
  removeAll: VoidFunction;
  getFilters: (name: string) => FeedFilters | null;
  setFilters: (name: string, value: FeedFilters) => void;
  move: (name: string, index: number) => void;
  swap: (nameA: string, nameB: string) => void;
};

const SubredditsContext = createContext<SubredditsContextValue>({
  subreddits: [],
  globalFilters: null,
  filterOptions: { types: ['video', 'image', 'text'] },
  add: () => {},
  remove: () => {},
  removeAll: () => {},
  getFilters: () => null,
  setFilters: () => {},
  move: () => {},
  swap: () => {},
});

export const SubredditsController = ({ children }: PropsWithChildren) => {
  const [subreddits, setSubreddits] = useState<SubredditsObject>(getSubreddits());
  const [globalFilters, setGlobalFilters] = useState<GlobalFilters | null>(null);

  const filterOptions: SubredditsFilterOptions = { types: ['video', 'image', 'text'] };

  useEffect(() => {
    setGlobalFilters(getDefaultFilters());
  }, []);

  const getFilters = useCallback(
    (name: string) => {
      if (!subreddits.items.hasOwnProperty(name)) {
        console.error(`Unknown subreddit name: "${name}".`);
        return null;
      }

      return subreddits.items[name];
    },
    [subreddits],
  );

  const setFilters = useCallback(
    (name: string, value: FeedFilters) => {
      if (!subreddits.items.hasOwnProperty(name)) {
        console.error(`Unknown subreddit name: "${name}".`);
        return;
      }

      setSubreddits((current) => ({
        ...current,
        [name]: value,
      }));
    },
    [setSubreddits],
  );

  useEffect(() => {
    cacheSubreddits(subreddits);
  }, [subreddits]);

  const subredditsArray = subreddits.order;

  const add = useCallback(
    (name: string) => {
      setSubreddits((current) => {
        current.items[name] = {};
        current.order.push(name);
        return { ...current };
      });
    },
    [setSubreddits],
  );

  const remove = useCallback(
    (name: string) => {
      if (!subreddits.items.hasOwnProperty(name)) {
        console.error(`Unknown subreddit name: "${name}".`);
        return;
      }

      setSubreddits((current) => {
        delete current.items[name];
        current.order = current.order.filter((subreddit) => subreddit !== name);
        return { ...current };
      });
      clearData(name);
    },
    [setSubreddits],
  );

  const removeAll = useCallback(() => {
    clearAllData(subreddits.order);
    setSubreddits({ items: {}, order: [] });
  }, [setSubreddits]);

  const move = useCallback(
    (subreddit: string, index: number) => {
      setSubreddits((current) => {
        const indexOfSubreddit = current.order.indexOf(subreddit);
        const indexModifier = indexOfSubreddit < index ? -1 : 0;
        const newOrder = [...current.order];

        newOrder.splice(indexOfSubreddit, 1);
        newOrder.splice(index + indexModifier, 0, subreddit);

        return {
          ...current,
          order: newOrder,
        };
      });
    },
    [setSubreddits],
  );

  const swap = useCallback(
    (subredditA: string, subredditB: string) => {
      setSubreddits((current) => {
        const indexA = current.order.indexOf(subredditA);
        const indexB = current.order.indexOf(subredditB);

        const newOrder = [...current.order];
        newOrder[indexA] = subredditB;
        newOrder[indexB] = subredditA;

        return {
          ...current,
          order: newOrder,
        };
      });
    },
    [setSubreddits],
  );

  return (
    <SubredditsContext.Provider
      value={{
        subreddits: subredditsArray,
        add,
        remove,
        removeAll,
        getFilters,
        setFilters,
        move,
        swap,
        filterOptions,
        globalFilters,
      }}
    >
      {children}
    </SubredditsContext.Provider>
  );
};

export const useSubreddits = () => {
  return useContext(SubredditsContext);
};
