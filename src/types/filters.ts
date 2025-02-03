import { PostItem } from '~/types/reddit';

export type Filters = {
  omitAuthors?: string[];
  pickAuthors?: string[];
  omitFlairs?: string[];
  pickFlairs?: string[];
  minThreshold?: number;
  minPoints?: number;
  minComments?: number;
  omitType?: PostItem['type'][];
  pickType?: PostItem['type'][];
  pickKeywords?: string[];
  omitKeywords?: string[];
};

export type FilterOptions = {
  types: PostItem['type'][];
  keywords: string[];
  authors: string[];
  flairs: string[];
};

export type NumberFilterProps<T extends Filters = Filters> = {
  filters: T;
  setFilters: (filters: T) => void;
};

export type PickOmitFilterProps = NumberFilterProps & {
  options: FilterOptions;
  addOption?: (key: keyof FilterOptions, option: string) => void;
};
