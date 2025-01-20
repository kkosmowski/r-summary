import styles from '~/components/Post/Post.module.scss';
import { PostItem } from '~/types/reddit';
import { useSettings } from '~/contexts/SettingsContext';

type PostPreviewProps = {
  post: PostItem;
};

export const PostPreview = ({ post }: PostPreviewProps) => {
  const { getValue } = useSettings();
  const showPreview = getValue('setting-show-preview');

  if (post.type === 'text' || !showPreview) {
    return null;
  }

  return (
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
  );
};
