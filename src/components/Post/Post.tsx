import { PostItem } from 'src/types/reddit';

import { PostHeader } from './components/PostHeader';
import styles from './Post.module.scss';

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

        {post.type !== 'text' && (
          <div className={styles.thumbnail}>
            {post.type === 'image' && (
              <img src={post.thumbnail.url} width={post.thumbnail.width} height={post.thumbnail.height} alt="" />
            )}
            {post.type === 'video' && (
              <video controls width="100%" height="100%" src={post.video} onClick={(e) => e.preventDefault()}>
                <source src={post.video} type="video/mp4" />
              </video>
            )}
          </div>
        )}
      </article>
    </a>
  );
};
