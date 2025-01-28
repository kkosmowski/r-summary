import { useDrop, XYCoord } from 'react-dnd';
import { useRef } from 'react';

import { useSettings } from '~/contexts/SettingsContext';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { getColumnsStyles } from '~/utils/get-columns-styles';
import { FEED_REPRESENTATION_GAP } from '~/components/FeedManagementView/consts/representation';

import { FeedBlock } from '../FeedBlock';
import { getBetween, getNewIndexOfDroppedFeed, getRepresentationSize } from './LayoutManager.utils';
import styles from './LayoutManager.module.scss';

export const LayoutManager = () => {
  const representation = useRef<HTMLDivElement | null>(null);
  const { getValue } = useSettings();
  const { subreddits, move, swap } = useSubreddits();

  const columns = getValue('setting-columns') as number;
  const style = getColumnsStyles(columns);

  const handleDrop = (subreddit: string, coords: XYCoord | null) => {
    if (!coords) {
      console.error('No coords when dropping – drag-n-drop aborted.');
      return;
    }

    const { x, y } = coords;
    const { left, top } = getRepresentationSize(representation.current);

    const relX = x - left;
    const relY = y - top;

    const between = getBetween({ x: relX, y: relY });
    if (!between) return;

    const index = getNewIndexOfDroppedFeed(between, columns);
    move(subreddit, index);
  };

  const [_, drop] = useDrop(() => ({
    accept: 'feedBlock',
    drop: (item: { id: string }, monitor) => {
      if (monitor.isOver()) {
        handleDrop(item.id, monitor.getClientOffset());
      }
    },
  }));

  const handleBlockDrop = ({ item, target }: { item: string; target: string }) => {
    swap(item, target);
  };

  return (
    <div ref={representation} className={styles.representation}>
      <div ref={drop} style={{ ...style, gap: FEED_REPRESENTATION_GAP + 'px' }} className={styles.feeds}>
        {subreddits.map((subreddit) => (
          <FeedBlock key={subreddit} subreddit={subreddit} onDrop={handleBlockDrop} />
        ))}
      </div>
    </div>
  );
};
