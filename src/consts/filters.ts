import { FilterOptions } from '~/types/filters';
import { FeedFilters, GlobalFilters } from '~/types/reddit';

export const defaultGlobalFilters: GlobalFilters = {
  pickType: [],
  omitType: [],
  pickKeywords: [],
  omitKeywords: [],
};

export const defaultFilterOptions: FilterOptions = {
  authors: [],
  flairs: [],
  types: ['video', 'image', 'text'],
  keywords: [],
};

export const defaultFeedFilters: FeedFilters = {
  omitAuthors: [],
  pickAuthors: [],
  omitFlairs: [],
  pickFlairs: [],
  minThreshold: 0,
  minPoints: 0,
  minComments: 0,
  omitType: [],
  pickType: [],
  pickKeywords: [],
  omitKeywords: [],
};
