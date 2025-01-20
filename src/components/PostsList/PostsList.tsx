import { Post } from '~/components/Post';
import { PostItem } from '~/types/reddit';
import { useSettings } from '~/contexts/SettingsContext';
import { useCallback } from 'react';

type RedditFeedProps = {
  items: PostItem[];
};

const clipItem = (item: string, length?: number | null) => {
  if (!length || item.length <= length) return item;
  return item.slice(0, length) + '...';
};

export const PostsList = ({ items }: RedditFeedProps) => {
  const { getValue } = useSettings();
  const postsPerSubreddit = getValue('setting-posts-per-subreddit') as number | null;
  const maxTitleLength = getValue('setting-clip-post-title') as number | null;
  const maxDescriptionLength = getValue('setting-clip-post-description') as number | null;

  const clip = useCallback(
    (post: PostItem, options: { titleLength?: number | null; descriptionLength?: number | null }) => {
      const { titleLength, descriptionLength } = options;

      if (!titleLength && !descriptionLength) return post;

      const clippedTitle = clipItem(post.title, titleLength);
      const clippedDescription = clipItem(post.description, descriptionLength);

      return {
        ...post,
        title: clippedTitle,
        description: clippedDescription,
      };
    },
    [],
  );

  const itemsToRender = postsPerSubreddit ? items.slice(0, postsPerSubreddit) : items;

  return (
    <>
      {itemsToRender.map((post) => (
        <Post
          key={post.id}
          post={clip(post, { descriptionLength: maxDescriptionLength, titleLength: maxTitleLength })}
        />
      ))}
    </>
  );
};
