import { Tooltip } from '~/components/Tooltip';
import { EyeIcon } from '~/icons/EyeIcon';
import { PostItem } from '~/types/reddit';

import styles from './PostMarkers.module.scss';

type PostMarkersProps = {
  isRead: PostItem['isRead'];
  isNew: PostItem['isNew'];
};

export const PostMarkers = ({ isNew, isRead }: PostMarkersProps) => {
  if (!isNew && !isRead) return null;

  if (isRead) {
    return (
      <div className={styles.marker}>
        <Tooltip title="You have visited this post already">
          <div className={styles.read}>
            <EyeIcon size={16} />
          </div>
        </Tooltip>
      </div>
    );
  }

  // isNew
  return (
    <div className={styles.marker}>
      <Tooltip title="This post is new in the feed">
        <div className={styles.new} />
      </Tooltip>
    </div>
  );
};
