import { FEED_BLOCK_HEIGHT, FEED_REPRESENTATION_GAP } from '~/components/FeedManagementView/consts/representation';
import { XYCoord } from 'react-dnd';

export const getRepresentationSize = (
  representation: HTMLDivElement | null,
): Pick<DOMRect, 'width' | 'height' | 'left' | 'top'> => {
  if (!representation) return { width: 0, height: 0, left: 0, top: 0 };
  return representation.getBoundingClientRect();
};

export const getBlockSize = (): { blockWidth: number; blockHeight: number } => {
  return {
    blockWidth: document.getElementsByClassName('feed-block')[0].getBoundingClientRect().width,
    blockHeight: FEED_BLOCK_HEIGHT,
  };
};

const recursive = (value: number, size: number, coord: number): [number, boolean] => {
  if (coord < size) {
    return [value, false];
  }
  if (coord < size + FEED_REPRESENTATION_GAP) {
    return [value + 1, true];
  }
  return recursive(value + 1, size, coord - size);
};

type BetweenValue = {
  vertical: number;
  horizontal: number;
};

export const getBetween = ({ x, y }: XYCoord): BetweenValue | null => {
  const { blockWidth, blockHeight } = getBlockSize();

  const [vertical, verticalInJunction] = recursive(0, blockWidth, x);
  const [horizontal, horizontalInJunction] = recursive(0, blockHeight, y);

  if (verticalInJunction && horizontalInJunction) {
    // item was dropped in a "junction" spot, i.e. in the middle of 4 blocks
    return null;
  }

  return { vertical, horizontal };
};

export const getNewIndexOfDroppedFeed = ({ vertical, horizontal }: BetweenValue, columns: number): number => {
  return columns * horizontal + vertical;
};
