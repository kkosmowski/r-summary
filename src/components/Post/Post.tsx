import { PostItem } from '~/types/reddit';

import { PostHeader } from './components/PostHeader';
import styles from './Post.module.scss';
import { PostPreview } from '~/components/Post/components/PostPreview/PostPreview.tsx';

type RedditFeedProps = {
  post: PostItem;
};

export const Post = ({ post }: RedditFeedProps) => {
  return (
    <a href={post.link} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
      <article className={styles.postContainer}>
        <div className={styles.content}>
          <PostHeader post={post} />

          <h2 className={styles.title}>{post.title}</h2>

          {post.description && (
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: post.description }} />
          )}
        </div>

        <PostPreview post={post} />
      </article>
    </a>
  );
};
