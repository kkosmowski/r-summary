import { TransformedData } from '~/types/reddit';
import { setData } from '~/utils/caching';
import { MS_IN_S, S_IN_M } from '~/consts/time';

export const cacheData = (data: TransformedData, refetchTimeInMin: number) => {
  const refetchTimeInMs = refetchTimeInMin * S_IN_M * MS_IN_S;

  console.log('refetchTimeInMs', refetchTimeInMs);
  console.log('refetchTimeInMin', refetchTimeInMin);

  setData(data.subreddit.name, data, refetchTimeInMs);
};
