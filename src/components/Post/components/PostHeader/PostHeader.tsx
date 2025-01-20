import { Flair } from '~/components/Flair';
import { PostItem } from '~/types/reddit';

import { Score } from '../Score';
import { Separator } from '~/components/Separator';

import styles from './PostHeader.module.scss';
import { CommentIcon } from '~/icons/CommentIcon';
import { useSettings } from '~/contexts/SettingsContext';

type PostHeaderProps = {
  post: PostItem;
};

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const PostHeader = ({ post }: PostHeaderProps) => {
  const { getValue } = useSettings();
  const showAuthor = getValue('setting-show-author') as boolean;
  const showCommentsCount = getValue('setting-show-comments') as boolean;

  return (
    <header className={styles.header}>
      {post.flair.text && (
        <>
          <Flair flair={post.flair} />
          <Separator />
        </>
      )}
      <Score score={post.score} />
      <Separator />
      {formatDate(new Date(post.createdAt))}
      {showAuthor && (
        <>
          <Separator />
          <a
            href={`https://reddit.com/user/${post.authorName}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.author}
          >
            {post.authorName}
          </a>
        </>
      )}
      {showCommentsCount && (
        <>
          <Separator />
          <span>
            <CommentIcon size={12} /> {post.commentCount}
          </span>
        </>
      )}
    </header>
  );
};
