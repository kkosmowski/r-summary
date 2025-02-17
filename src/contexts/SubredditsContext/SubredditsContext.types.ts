import { Filters } from '~/types/filters';

export type SubredditsObject = {
  order: string[];
  items: Record<string, Filters>;
  merged: Record<string, string[]>;
};
