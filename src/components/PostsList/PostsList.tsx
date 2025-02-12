import { useCallback } from 'react';

import { Post } from '~/components/Post';
import { useRedditFeed } from '~/contexts/RedditFeedContext';
import { PostItem } from '~/types/reddit';
import { useSettings } from '~/contexts/SettingsContext';

import styles from './PostsList.module.scss';

type RedditFeedProps = {
  items: PostItem[];
};

const clipItem = (item: string, length?: number | null) => {
  if (!length || item.length <= length) return item;
  return item.slice(0, length) + '...';
};

export const PostsList = ({ items }: RedditFeedProps) => {
  const { getValue } = useSettings();
  const { readPost } = useRedditFeed();
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

  if (itemsToRender.length === 0) {
    return <span className={styles.noItems}>No items. Consider modifying filters.</span>;
  }

  const handleRead = (postId: PostItem['id']) => {
    readPost(postId);
  };

  return (
    <>
      {itemsToRender.map((post) => (
        <Post
          key={post.id}
          post={clip(post, { descriptionLength: maxDescriptionLength, titleLength: maxTitleLength })}
          onRead={handleRead}
        />
      ))}
    </>
  );
};
