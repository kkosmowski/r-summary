import { FeedFilters, PostItem } from '~/types/reddit';

export type FilterOptions = {
  types: PostItem['type'][];
  keywords: string[];
  authors: string[];
  flairs: string[];
};

export type FiltersProps<T extends FeedFilters = FeedFilters> = {
  filters: T;
  options: FilterOptions;
  setFilters: (filters: T) => void;
  addOption?: (key: keyof FilterOptions, option: string) => void;
};
