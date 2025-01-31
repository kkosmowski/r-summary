import { FeedFilters, PostItem } from '~/types/reddit';

export type FilterOptions = {
  types: PostItem['type'][];
  keywords: string[];
  authors: string[];
  flairs: string[];
};

export type NumberFilterProps<T extends FeedFilters = FeedFilters> = {
  filters: T;
  setFilters: (filters: T) => void;
};

export type PickOmitFilterProps = NumberFilterProps & {
  options: FilterOptions;
  addOption?: (key: keyof FilterOptions, option: string) => void;
};
