import { CACHE_TIME } from '~/consts/api';
import { REDDIT_URL } from '~/consts/reddit';
import { PostItem, RawRedditData, TransformedData } from '~/types/reddit';
import { cacheData } from '~/utils/cache-data';
import { htmlDecode } from '~/utils/html-decode';

export const mergeData = (record: Record<string, RawRedditData>): { isMerged: boolean; data: RawRedditData } => {
  const subreddits = Object.keys(record);

  if (subreddits.length === 1) return { isMerged: false, data: record[subreddits[0]] };

  return {
    isMerged: true,
    data: {
      kind: record[subreddits[0]].kind,
      data: {
        children: Object.values(record)
          .flatMap((data) => data.data.children)
          .sort((post1, post2) => post2.data.created - post1.data.created),
      },
    },
  };
};

const selftext_html_start = 43;
const selftext_html_end = -33;

export const prepareData = (
  rawData: Record<string, RawRedditData>,
  refetchTimeInMin = CACHE_TIME,
  feed?: string,
  oldData?: TransformedData | undefined,
): TransformedData => {
  const { isMerged, data } = mergeData(rawData);

  if (isMerged && !feed) {
    console.error('Error: Feed is merged but no feed is provided.');
  }

  const basicData = data.data.children[0].data;

  const transformed = {
    subreddit: {
      name: isMerged ? feed! : basicData.subreddit.toLowerCase(),
      prefixed: isMerged ? feed! : basicData.subreddit_name_prefixed.toLowerCase(),
      url: isMerged ? '' : `${REDDIT_URL}/${basicData.subreddit_name_prefixed.toLowerCase()}`,
    },
    items: data.data.children
      .filter(({ data }) => !data.stickied)
      .map(
        ({ data }) =>
          ({
            id: data.id,
            isNew: !oldData || oldData.items.some((post) => post.id === data.id),
            isRead: !!oldData?.items.filter((post) => post.id === data.id)[0]?.isRead,
            awards: data.all_awardings,
            authorName: data.author,
            createdAt: data.created * 1000,
            title: htmlDecode(data.title),
            description: htmlDecode(data.selftext_html?.slice(selftext_html_start, selftext_html_end)),
            score: {
              ups: Math.round(data.upvote_ratio * 100),
              total: data.score,
            },
            commentCount: data.num_comments,
            flair: {
              text: data.link_flair_text,
              color: data.link_flair_text_color,
              backgroundColor: data.link_flair_background_color,
            },
            link: REDDIT_URL + data.permalink,
            thumbnail: {
              url: data.thumbnail,
              width: data.thumbnail_width,
              height: data.thumbnail_height,
            },
            video: data.media?.reddit_video?.fallback_url,
            type: data.post_hint === 'hosted:video' ? 'video' : data.post_hint ? 'image' : 'text',
            visited: data.visited,
          }) satisfies PostItem,
      ),
  };

  cacheData(transformed, refetchTimeInMin);
  return transformed;
};
