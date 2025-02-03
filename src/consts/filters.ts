import { Filters, FilterOptions } from '~/types/filters';

export const defaultGlobalFilters: Filters = {
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

export const defaultFeedFilters: Filters = {
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
