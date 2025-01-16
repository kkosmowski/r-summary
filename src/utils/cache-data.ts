import { TransformedData } from 'src/types/reddit';
import { setData } from 'src/utils/caching';
import { CACHE_TIME } from 'src/consts/api';

export const cacheData = (data: TransformedData) => {
  setData(data.subreddit.name, data, CACHE_TIME);
};
