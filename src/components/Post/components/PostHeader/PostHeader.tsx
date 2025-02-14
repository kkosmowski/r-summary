import { MouseEvent, useRef } from 'react';
import { Flair } from '~/components/Flair';
import { PickOmitPopup } from '~/components/PickOmitPopup';
import { useToggle } from '~/hooks/use-toggle';
import { PostItem } from '~/types/reddit';
import { Separator } from '~/components/Separator';
import { CommentIcon } from '~/icons/CommentIcon';
import { useSettings } from '~/contexts/SettingsContext';

import { Score } from '../Score';
import styles from './PostHeader.module.scss';

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
  const authorRef = useRef<HTMLDivElement | null>(null);
  const { isOpen: isPopupOpen, open: openPopup, close: closePopup } = useToggle();

  const handleAuthorClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    openPopup();
  };

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
          <span ref={authorRef} className={styles.author} onClick={handleAuthorClick}>
            {post.authorName}
          </span>
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

      <PickOmitPopup
        anchor={authorRef.current}
        open={isPopupOpen}
        type="author"
        text={post.authorName}
        onClose={closePopup}
      />
    </header>
  );
};
