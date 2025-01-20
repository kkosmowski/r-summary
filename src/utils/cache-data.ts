import { TransformedData } from '~/types/reddit';
import { setData } from '~/utils/caching';
import { CACHE_TIME } from '~/consts/api';

export const cacheData = (data: TransformedData) => {
  setData(data.subreddit.name, data, CACHE_TIME);
};
