import { ConnectDragPreview, ConnectDragSource, useDrag, useDrop } from 'react-dnd';

import { FEED_BLOCK_HEIGHT } from '~/components/FeedManagementView/consts/representation';
import { cn } from '~/utils/cn';

import styles from './FeedBlock.module.scss';

type FeedBlockProps = {
  subreddit: string;
  onDrop: (dropData: { item: string; target: string }) => void;
};

export const FeedBlock = ({ subreddit, onDrop }: FeedBlockProps) => {
  const [collected, drag, dragPreview]: [{ isDragging: boolean }, ConnectDragSource, ConnectDragPreview] = useDrag(
    () => ({
      type: 'feedBlock',
      item: { id: subreddit },
      options: {},
    }),
  );

  const [_, drop] = useDrop(() => ({
    accept: 'feedBlock',
    options: {
      id: subreddit,
    },
    drop: (item: { id: string }, monitor) => {
      if (monitor.isOver() && item.id !== subreddit) {
        onDrop({ item: item.id, target: subreddit });
      }
    },
  }));

  if (collected?.isDragging) {
    return <div ref={dragPreview} className={styles.grabbing} />;
  }

  return (
    <div ref={drop}>
      <div
        ref={drag}
        className={cn(styles.feedBlock, 'feed-block')}
        style={{ height: FEED_BLOCK_HEIGHT + 'px' }}
        {...collected}
      >
        r/{subreddit}
      </div>
    </div>
  );
};
