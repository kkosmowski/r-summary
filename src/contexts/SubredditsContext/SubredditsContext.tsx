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

  return (
    <SubredditsContext.Provider value={{ subreddits: subredditsArray, add, remove, getFilters, setFilters }}>
      {children}
    </SubredditsContext.Provider>
  );
};

export const useSubreddits = () => {
  return useContext(SubredditsContext);
};
