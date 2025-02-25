import { Filters } from '~/types/filters';
import { PostItem } from '~/types/reddit';
import { isAnyItemInStrings } from '~/utils/is-any-item-in-strings';

export const validateWithGlobalFilters = (filters: Filters, post: PostItem) => {
  if (filters.pickType?.length) {
    if (!filters.pickType.includes(post.type)) return false;
  }

  if (filters.omitType?.length) {
    if (filters.omitType.includes(post.type)) return false;
  }

  if (filters.pickKeywords?.length) {
    if (!isAnyItemInStrings(filters.pickKeywords, [post.title, post.description])) return false;
  }

  if (filters.omitKeywords?.length) {
    if (isAnyItemInStrings(filters.omitKeywords, [post.title, post.description])) return false;
  }

  return true;
};

export const validateWithFeedFilters = (filters: Filters, post: PostItem) => {
  if (filters.pickAuthors?.length) {
    if (!filters.pickAuthors.includes(post.authorName)) return false;
  }

  if (filters.omitAuthors?.length) {
    if (filters.omitAuthors.includes(post.authorName)) return false;
  }

  if (filters.pickFlairs?.length) {
    if (!filters.pickFlairs.includes(post.flair.text)) return false;
  }

  if (filters.omitFlairs?.length) {
    if (filters.omitFlairs.includes(post.flair.text)) return false;
  }

  if (filters.pickType?.length) {
    if (!filters.pickType.includes(post.type)) return false;
  }

  if (filters.omitType?.length) {
    if (filters.omitType.includes(post.type)) return false;
  }

  if (filters.pickKeywords?.length) {
    if (!isAnyItemInStrings(filters.pickKeywords, [post.title, post.description])) return false;
  }

  if (filters.omitKeywords?.length) {
    if (isAnyItemInStrings(filters.omitKeywords, [post.title, post.description])) return false;
  }

  if (filters.minThreshold && post.score.ups < filters.minThreshold) return false;

  if (filters.minPoints && post.score.total < filters.minPoints) return false;

  if (filters.minComments && post.commentCount < filters.minComments) return false;

  return true;
};
