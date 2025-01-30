import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { defaultFilterOptions, defaultGlobalFilters } from '~/consts/filters';

import { FeedFilters, GlobalFilters } from '~/types/reddit';
import { FilterOptions } from '~/types/filters';
import { clearAllData, clearData } from '~/utils/caching';
import { countActiveFilters } from '~/utils/count-active-filters';

import { SubredditsObject } from './SubredditsContext.types';
import {
  cacheSubreddits,
  getDefaultGlobalFilters,
  getSubreddits,
  cacheFilterOptions,
  getCachedFilterOptions,
  cacheDefaultFilters,
} from './SubredditsContext.utils';

type SubredditsContextValue = {
  subreddits: string[];
  globalFilters: GlobalFilters;
  setGlobalFilters: (filters: GlobalFilters) => void;
  filterOptions: FilterOptions;
  addFilterOption: (key: keyof FilterOptions, value: string) => void;
  activeFilters: number;
  add: (name: string) => void;
  remove: (name: string) => void;
  removeAll: VoidFunction;
  getFilters: (name: string) => FeedFilters;
  setFilters: (name: string, value: FeedFilters) => void;
  move: (name: string, index: number) => void;
  swap: (nameA: string, nameB: string) => void;
  saveDefaultFilters: VoidFunction;
};

const SubredditsContext = createContext<SubredditsContextValue>({
  subreddits: [],
  globalFilters: {},
  setGlobalFilters: () => {},
  filterOptions: defaultFilterOptions,
  activeFilters: 0,
  addFilterOption: () => {},
  add: () => {},
  remove: () => {},
  removeAll: () => {},
  getFilters: () => ({}),
  setFilters: () => {},
  move: () => {},
  swap: () => {},
  saveDefaultFilters: () => {},
});

export const SubredditsController = ({ children }: PropsWithChildren) => {
  const [subreddits, setSubreddits] = useState<SubredditsObject>(getSubreddits());
  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>(defaultGlobalFilters);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [activeFilters, setActiveFilters] = useState(0);

  useEffect(() => {
    setGlobalFilters(getDefaultGlobalFilters());
    setFilterOptions(getCachedFilterOptions() ?? defaultFilterOptions);
  }, []);

  useEffect(() => {
    setActiveFilters(countActiveFilters(globalFilters, defaultGlobalFilters));
  }, [globalFilters]);

  useEffect(() => {
    cacheSubreddits(subreddits);
  }, [subreddits]);

  const saveDefaultFilters = useCallback(() => {
    cacheDefaultFilters(globalFilters ?? defaultGlobalFilters);
  }, [globalFilters]);

  const addFilterOption = useCallback(
    (key: keyof FilterOptions, value: string) => {
      setFilterOptions((current) => {
        const newOptions = {
          ...current,
          [key]: [...current[key], value].sort(),
        };

        cacheFilterOptions(newOptions);
        return newOptions;
      });
    },
    [setFilterOptions],
  );

  const getFilters = useCallback(
    (name: string) => {
      if (!subreddits.items.hasOwnProperty(name)) {
        console.error(`Unknown subreddit name: "${name}".`);
        return {};
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
        order: current.order,
        items: {
          ...current.items,
          [name]: value,
        },
      }));
    },
    [setSubreddits],
  );

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
        subreddits: subreddits.order,
        add,
        remove,
        removeAll,
        getFilters,
        setFilters,
        move,
        swap,
        filterOptions,
        addFilterOption,
        globalFilters,
        setGlobalFilters,
        activeFilters,
        saveDefaultFilters,
      }}
    >
      {children}
    </SubredditsContext.Provider>
  );
};

export const useSubreddits = () => {
  return useContext(SubredditsContext);
};
