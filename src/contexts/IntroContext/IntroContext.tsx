import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

import { IntroKey } from '~/types/intro';

type IntroContextValue = {
  isFinished: (step: IntroKey) => boolean;
  isAllFinished: boolean;
  onlyAddLeft: boolean;
  introCompleted: boolean;
  mark: (step: IntroKey) => void;
  finishAll: VoidFunction;
};

const introLsKey = 'intro' as const;
const steps: IntroKey[] = ['add-feed', 'manage-feeds', 'settings', 'global-filters', 'feed-filters', 'refetch'];

function cacheIntro(steps: IntroKey[]) {
  localStorage.setItem(introLsKey, steps.join(','));
}

function getCachedIntro(): IntroKey[] {
  const cachedSteps = localStorage.getItem(introLsKey);

  if (cachedSteps === null) {
    return steps;
  }

  if (cachedSteps === '') return [];

  return cachedSteps.split(',') as IntroKey[];
}

const IntroContext = createContext<IntroContextValue>({
  isFinished: () => false,
  isAllFinished: false,
  onlyAddLeft: false,
  introCompleted: false,
  mark: () => {},
  finishAll: () => {},
});

export const IntroController = ({ children }: PropsWithChildren) => {
  const [todo, setTodo] = useState<IntroKey[]>(getCachedIntro());

  const mark = useCallback(
    (step: IntroKey) => {
      setTodo((current) => {
        const newTodo = current.filter((item) => item !== step);
        cacheIntro(newTodo);
        return newTodo;
      });
    },
    [setTodo],
  );

  const finishAll = useCallback(() => {
    setTodo([]);
    cacheIntro([]);
  }, [setTodo]);

  const isAllFinished = useMemo(() => todo.length === 0, [todo]);
  const isFinished = useCallback((step: IntroKey) => !todo.includes(step), [todo]);
  const onlyAddLeft = useMemo(() => todo.length === 1 && todo.includes('add-feed'), [todo]);
  const introCompleted = useMemo(() => todo.length === 0, [todo]);

  return (
    <IntroContext.Provider
      value={{
        isFinished,
        isAllFinished,
        onlyAddLeft,
        mark,
        finishAll,
        introCompleted,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => {
  return useContext(IntroContext);
};
