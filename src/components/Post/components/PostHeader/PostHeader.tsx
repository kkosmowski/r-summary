import { Flair } from 'src/components/Flair';
import { PostItem } from 'src/types/reddit';

import { Score } from '../Score';
import { Separator } from 'src/components/Separator';

import styles from './PostHeader.module.scss';
import { CommentIcon } from 'src/icons/CommentIcon';

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
  return (
    <header className={styles.header}>
      <Flair flair={post.flair} />
      <Separator />
      <Score score={post.score} />
      <Separator />
      {formatDate(post.createdAt)}
      {/*<Separator />*/}
      {/*<a*/}
      {/*  href={`https://reddit.com/user/${post.authorName}`}*/}
      {/*  target="_blank"*/}
      {/*  rel="noopener noreferrer"*/}
      {/*  className={styles.author}*/}
      {/*>*/}
      {/*  {post.authorName}*/}
      {/*</a>*/}
      <Separator />
      <span>
        <CommentIcon size={12} /> {post.commentCount}
      </span>
    </header>
  );
};
