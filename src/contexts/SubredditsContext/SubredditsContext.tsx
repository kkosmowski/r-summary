import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { SubredditFilters } from '~/types/reddit';
import { clearData } from '~/utils/caching';

type SubredditsObject = {
  order: string[];
  items: Record<string, SubredditFilters>;
};

type SubredditsContextValue = {
  subreddits: string[];
  add: (name: string) => void;
  remove: (name: string) => void;
  getFilters: (name: string) => SubredditFilters | null;
  setFilters: (name: string, value: SubredditFilters) => void;
  move: (name: string, index: number) => void;
  swap: (nameA: string, nameB: string) => void;
};

const subredditsLsKey = 'subreddits' as const;

function cacheSubreddits(subreddits: SubredditsObject) {
  localStorage.setItem(subredditsLsKey, JSON.stringify(subreddits));
}

export const getSubreddits = () => {
  const data = JSON.parse(localStorage.getItem(subredditsLsKey) ?? 'null');
  if (!data) return { order: [], items: {} };

  return data as SubredditsObject;
};

const SubredditsContext = createContext<SubredditsContextValue>({
  subreddits: [],
  add: () => {},
  remove: () => {},
  getFilters: () => null,
  setFilters: () => {},
  move: () => {},
  swap: () => {},
});

export const SubredditsController = ({ children }: PropsWithChildren) => {
  const [subreddits, setSubreddits] = useState<SubredditsObject>(getSubreddits());

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
    (name: string, value: SubredditFilters) => {
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
      value={{ subreddits: subredditsArray, add, remove, getFilters, setFilters, move, swap }}
    >
      {children}
    </SubredditsContext.Provider>
  );
};

export const useSubreddits = () => {
  return useContext(SubredditsContext);
};
