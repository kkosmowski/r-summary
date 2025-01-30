import { FeedFilters } from '~/types/reddit';

export type SubredditsObject = {
  order: string[];
  items: Record<string, FeedFilters>;
};
