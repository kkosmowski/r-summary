import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { defaultFeedFilters, defaultFilterOptions, defaultGlobalFilters } from '~/consts/filters';
import { exampleSubreddit } from '~/consts/mock';
import { useIntro } from '~/contexts/IntroContext';

import { Filters, FilterOptions } from '~/types/filters';
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
  removeSubredditHelperFn,
  renameSubredditHelperFn,
} from './SubredditsContext.utils';

type MergeOptions = {
  switch?: boolean;
  name?: string;
};

type SubredditsContextValue = {
  subreddits: string[];
  globalFilters: Filters;
  setGlobalFilters: (filters: Filters) => void;
  filterOptions: FilterOptions;
  addFilterOption: (key: keyof FilterOptions, value: string) => void;
  activeFilters: number;
  add: (name: string) => void;
  remove: (name: string) => void;
  removeAll: VoidFunction;
  getFilters: (name: string) => Filters;
  setFilters: (name: string, value: Filters) => void;
  getMerged: (name: string) => string[];
  move: (name: string, index: number) => void;
  swap: (nameA: string, nameB: string) => void;
  merge: (subreddit: string, newSubreddit: string, options?: MergeOptions) => void;
  update: (oldName: string, newName: string) => void;
  saveDefaultFilters: VoidFunction;
};

const SubredditsContext = createContext<SubredditsContextValue>({
  subreddits: [],
  globalFilters: defaultGlobalFilters,
  setGlobalFilters: () => {},
  filterOptions: defaultFilterOptions,
  activeFilters: 0,
  addFilterOption: () => {},
  add: () => {},
  remove: () => {},
  removeAll: () => {},
  getFilters: () => defaultFeedFilters,
  setFilters: () => {},
  getMerged: () => [],
  move: () => {},
  swap: () => {},
  merge: () => {},
  update: () => {},
  saveDefaultFilters: () => {},
});

export const SubredditsController = ({ children }: PropsWithChildren) => {
  const { finishAll } = useIntro();
  const [subreddits, setSubreddits] = useState<SubredditsObject>(getSubreddits());
  const [globalFilters, setGlobalFilters] = useState<Filters>(defaultGlobalFilters);
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
    cacheSubreddits({
      items: subreddits.items ?? {},
      order: subreddits.order ?? [],
      details: subreddits.details ?? {},
    });

    if (subreddits.order.length > 0) {
      finishAll();
    }
  }, [subreddits, finishAll]);

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
        if (name !== exampleSubreddit.subreddit.name) {
          console.error(`Unknown subreddit name: "${name}".`);
        }
        return defaultFeedFilters;
      }

      return subreddits.items[name];
    },
    [subreddits],
  );

  const setFilters = useCallback(
    (name: string, value: Filters) => {
      if (!subreddits.items.hasOwnProperty(name)) {
        console.error(`Unknown subreddit name: "${name}".`);
        return;
      }

      setSubreddits((current) => ({
        order: current.order,
        details: current.details,
        items: {
          ...current.items,
          [name]: value,
        },
      }));
    },
    [setSubreddits],
  );

  const getMerged = useCallback(
    (name: string) => {
      return subreddits.details[name] ?? [name];
    },
    [subreddits],
  );

  const add = useCallback(
    (name: string) => {
      setSubreddits((current) => {
        current.items[name] = defaultFeedFilters;
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

      setSubreddits((current) => removeSubredditHelperFn(current, name));
      clearData(name);
    },
    [setSubreddits],
  );

  const removeAll = useCallback(() => {
    clearAllData(subreddits.order);
    setSubreddits({ items: {}, order: [], details: {} });
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

  const merge = useCallback(
    (subredditA: string, subredditB: string, options?: MergeOptions) => {
      setSubreddits((current) => {
        if (!options) {
          // feed A will now contain A & B
          current.details[subredditA] = current.details[subredditA]
            ? [...current.details[subredditA], subredditB]
            : [subredditA, subredditB];
          // clear A data to refetch it
          clearData(subredditA);

          // if feed B existed, remove it
          if (current.items[subredditB]) {
            current = removeSubredditHelperFn(current, subredditB);
            clearData(subredditB);
          }
        } else if (options.name) {
          // renamed feed A to new name
          renameSubredditHelperFn(current, subredditA, options.name);
          current.details[options.name] = current.details[subredditA]
            ? [...current.details[subredditA], subredditB]
            : current.details[options.name]
              ? [...current.details[options.name], subredditB]
              : [subredditA, subredditB];
          // remove feed B and clear A & B data
          current = removeSubredditHelperFn(current, subredditB);
          delete current.items[subredditA];
          delete current.details[subredditA];
          delete current.items[subredditB];
          delete current.details[subredditB];
          clearData(subredditA);
          clearData(subredditB);
        } else if (options.switch) {
          // feed B will now contain A & B
          renameSubredditHelperFn(current, subredditA, subredditB);
          current.details[subredditB] = current.details[subredditB]
            ? [...current.details[subredditB], subredditA]
            : [subredditB, subredditA];
          // remove feed A and clear A data
          delete current.items[subredditA];
          delete current.details[subredditA];
          clearData(subredditA);
        }

        return { ...current };
      });
    },
    [setSubreddits],
  );

  const update = useCallback(
    (oldName: string, newName: string) => {
      setSubreddits((current) => {
        renameSubredditHelperFn(current, oldName, newName, true);
        delete current.items[oldName];
        delete current.details[oldName];
        clearData(oldName);
        return { ...current };
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
        getMerged,
        move,
        swap,
        merge,
        update,
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
