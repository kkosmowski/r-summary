import { useState } from 'react';

import styles from '~/components/Post/Post.module.scss';
import { PostItem } from '~/types/reddit';
import { useSettings } from '~/contexts/SettingsContext';

type PostPreviewProps = {
  post: PostItem;
};

export const PostPreview = ({ post }: PostPreviewProps) => {
  const { getValue } = useSettings();
  const [hide, setHide] = useState(false);
  const showPreview = getValue('setting-show-preview');

  if (post.type === 'text' || !showPreview) {
    return null;
  }

  const isSpoiler = post.thumbnail?.url === 'spoiler';

  return (
    <div className={styles.thumbnail}>
      {post.type === 'image' && !isSpoiler && !hide && (
        <img
          src={post.thumbnail?.url}
          width={post.thumbnail?.width}
          height={post.thumbnail?.height}
          alt={post.title}
          onError={() => setHide(true)}
        />
      )}
      {post.type === 'video' && (
        <video controls src={post.video} onClick={(e) => e.preventDefault()}>
          <source src={post.video} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
