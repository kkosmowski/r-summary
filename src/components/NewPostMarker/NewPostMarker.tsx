import { Tooltip } from '~/components/Tooltip';

import styles from './NewPostMarker.module.scss';

export const NewPostMarker = () => {
  return (
    <div className={styles.marker}>
      <Tooltip title="This post is new in the feed">
        <div className={styles.content} />
      </Tooltip>
    </div>
  );
};
