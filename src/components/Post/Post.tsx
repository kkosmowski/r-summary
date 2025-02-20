import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { PostMarkers } from 'src/components/PostMarkers';
import { getHeightOfElementWithDirection } from '~/components/Post/Post.utils';
import { useSettings } from '~/contexts/SettingsContext';

import { PostItem } from '~/types/reddit';

import { PostHeader } from './components/PostHeader';
import { PostPreview } from './components/PostPreview';
import styles from './Post.module.scss';

type PostProps = {
  post: PostItem;
  showSubredditName?: boolean;
  onRead: (postId: PostItem['id']) => void;
};

export const Post = ({ post, showSubredditName, onRead }: PostProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { getValue } = useSettings();
  const columns = getValue('setting-columns');

  const changeContentDirectionIfNecessary = debounce(() => {
    if (!contentRef.current || !containerRef.current) return;

    const rowDirHeight = getHeightOfElementWithDirection(containerRef.current, 'row');
    const colDirHeight = getHeightOfElementWithDirection(containerRef.current, 'column');
    containerRef.current.style.flexDirection = rowDirHeight > colDirHeight ? 'column' : 'row';
  }, 100);

  useEffect(() => {
    if (!post.thumbnail) return;
    changeContentDirectionIfNecessary();
  }, [columns]);

  useEffect(() => {
    if (!post.thumbnail) return;

    window.addEventListener('resize', changeContentDirectionIfNecessary);

    return () => {
      window.removeEventListener('resize', changeContentDirectionIfNecessary);
    };
  }, []);

  const handleClick = () => {
    onRead(post.id);
  };

  const className = [styles.postContainer, 'postContainer', post.isRead ? styles.read : null].join(' ').trimEnd();

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.postLink}
      onResize={changeContentDirectionIfNecessary}
    >
      <article ref={containerRef} className={className} onClick={handleClick} onAuxClick={handleClick}>
        <PostMarkers isRead={post.isRead} isNew={post.isNew} />
        {showSubredditName && <span className={styles.subreddit}>{post.subreddit.prefixed}</span>}
        <div ref={contentRef} className={styles.content}>
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
