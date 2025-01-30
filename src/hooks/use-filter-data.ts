import { useSubreddits } from '~/contexts/SubredditsContext';
import { validateWithFeedFilters, validateWithGlobalFilters } from '~/hooks/use-filter-data.utils';
import { TransformedData } from '~/types/reddit';

export const useFilterData = (data: TransformedData | undefined): TransformedData['items'] | undefined => {
  const { getFilters, globalFilters } = useSubreddits();

  if (!data) return undefined;

  const feedFilters = getFilters(data.subreddit.name);

  return data.items.filter((postItem) => {
    if (!validateWithGlobalFilters(globalFilters, postItem)) return false;
    if (!validateWithFeedFilters(feedFilters, postItem)) return false;

    return true;
  });
};
