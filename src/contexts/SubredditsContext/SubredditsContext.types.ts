import { PostItem, FeedFilters } from '~/types/reddit';

export type SubredditsObject = {
  order: string[];
  items: Record<string, FeedFilters>;
};

export type SubredditsFilterOptions = {
  types: PostItem['type'][];
};
