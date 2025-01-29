import { useSubreddits } from '~/contexts/SubredditsContext';
import { TransformedData } from '~/types/reddit';
import { isAnyItemInStrings } from '~/utils/is-any-item-in-strings';

export const useFilterData = (data: TransformedData | undefined): TransformedData['items'] | undefined => {
  const { globalFilters } = useSubreddits();

  if (!data) return undefined;

  return data.items.filter((postItem) => {
    if (globalFilters?.pickType?.length) {
      if (!globalFilters.pickType.includes(postItem.type)) return false;
    }
    if (globalFilters?.omitType?.length) {
      if (globalFilters.omitType.includes(postItem.type)) return false;
    }
    if (globalFilters?.pickKeywords?.length) {
      if (!isAnyItemInStrings(globalFilters.pickKeywords, [postItem.title, postItem.description])) return false;
    }
    if (globalFilters?.omitKeywords?.length) {
      if (isAnyItemInStrings(globalFilters.omitKeywords, [postItem.title, postItem.description])) return false;
    }

    return true;
  });
};
