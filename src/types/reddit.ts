export type RawRedditData = {
  kind: 'Listing';
  data: {
    children: {
      kind: string;
      data: {
        id: string;
        all_awardings: unknown[];
        author: string;
        created: number;
        link_flair_text: string;
        link_flair_text_color: 'light' | 'dark';
        link_flair_background_color: string;
        num_comments: number;
        permalink: string;
        score: number;
        stickied: boolean;
        subreddit: string;
        subreddit_name_prefixed: string;
        upvote_ratio: number;
        title: string;
        thumbnail: string;
        thumbnail_width: number;
        thumbnail_height: number;
        media: { reddit_video: { fallback_url: string } } | null;
        post_hint?: 'hosted:video' | 'image';
        selftext_html: string;
        visited: boolean;
      };
    }[];
  };
};

export type PostItem = {
  id: string;
  awards: unknown[];
  authorName: string;
  createdAt: number;
  title: string;
  description: string;
  score: {
    ups: number;
    total: number;
  };
  commentCount: number;
  flair: {
    text: string;
    color: 'light' | 'dark';
    backgroundColor: string;
  };
  link: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  video: string | undefined;
  visited: boolean;
  type: 'video' | 'image' | 'text';
};

export type SubredditData = {
  name: string;
  prefixed: string;
  url: string;
};

export type TransformedData = {
  subreddit: SubredditData;
  items: PostItem[];
};

export type SubredditFilters = {
  omitAuthors?: string[];
  pickAuthors?: string[];
  omitFlairs?: string[];
  pickFlairs?: string[];
  minThreshold?: number;
  minPoints?: number;
  minComments?: number;
  omitType?: ('video' | 'image' | 'text')[];
  pickType?: ('video' | 'image' | 'text')[];
  pickKeywords?: string[];
  omitKeywords?: string[];
};
