import { MouseEvent, useRef } from 'react';
import { useToggle } from '~/hooks/use-toggle';
import { PostItem } from '~/types/reddit';
import { PickOmitPopup } from 'src/components/PickOmitPopup';

import { getColors } from './Flair.utils';
import styles from './Flair.module.scss';

export const Flair = ({ flair }: Pick<PostItem, 'flair'>) => {
  const { text, color, backgroundColor: bgColor } = flair;
  const flairRef = useRef<HTMLDivElement | null>(null);
  const { isOpen: isPopupOpen, open: openPopup, close: closePopup } = useToggle();

  const { textColor, backgroundColor } = getColors(color, bgColor);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    openPopup();
  };

  return (
    <>
      <div ref={flairRef} className={styles.badge} style={{ color: textColor, backgroundColor }} onClick={handleClick}>
        {text}
      </div>

      <PickOmitPopup anchor={flairRef.current} open={isPopupOpen} type="flair" text={flair.text} onClose={closePopup} />
    </>
  );
};
