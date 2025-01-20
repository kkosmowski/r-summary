import { Post } from '~/components/Post';
import { PostItem } from '~/types/reddit';
import { useSettings } from '~/contexts/SettingsContext';

type RedditFeedProps = {
  items: PostItem[];
};

export const PostsList = ({ items }: RedditFeedProps) => {
  const { getValue } = useSettings();
  const postsPerSubreddit = getValue('setting-posts-per-subreddit') as number | null;

  const itemsToRender = postsPerSubreddit ? items.slice(0, postsPerSubreddit) : items;

  return (
    <>
      {itemsToRender.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
