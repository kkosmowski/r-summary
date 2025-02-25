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
  isNew: boolean;
  isRead: boolean;
  awards: unknown[];
  authorName: string;
  createdAt: number;
  title: string;
  description: string;
  score: {
    ups: number;
    total: number;
  };
  subreddit: {
    name: string;
    prefixed: string;
  };
  commentCount: number;
  flair: {
    text: string;
    color: 'light' | 'dark' | null;
    backgroundColor: string | '' | null;
  };
  link: string;
  thumbnail:
    | {
        url: string;
        width: number;
        height: number;
      }
    | undefined;
  video?: string | undefined;
  visited: boolean;
  type: 'video' | 'image' | 'text';
};

export type SubredditData = {
  isMerged?: boolean;
  original: string;
  name: string;
  prefixed: string;
  url: string;
};

export type TransformedData = {
  subreddit: SubredditData;
  items: PostItem[];
};
