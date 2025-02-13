import { MouseEvent } from 'react';
import { Button } from '~/components/Button';
import { Popup, PopupProps } from '~/components/Popup';
import { useRedditFeed } from '~/contexts/RedditFeedContext';

import { usePickOmit } from './PickOmitPopup.hooks';
import { PickOmitType } from './PickOmitPopup.types';
import styles from './PickOmitPopup.module.scss';

export type PickOmitPopupProps = PopupProps & {
  type: PickOmitType;
  text: string;
};

export const PickOmitPopup = ({ type, text, anchor, open, onClose }: PickOmitPopupProps) => {
  const { r } = useRedditFeed();
  const { pick, omit } = usePickOmit();

  const handlePick = () => {
    pick(text, type, r);
  };

  const handleOmit = () => {
    omit(text, type, r);
  };

  return (
    <Popup anchor={anchor} open={open} onClose={onClose} onClick={(e: MouseEvent) => e.preventDefault()}>
      <section className={styles.grid}>
        <Button size="small" onClick={handlePick}>
          Pick this {type}
        </Button>
        <Button size="small" onClick={handleOmit}>
          Omit this {type}
        </Button>
      </section>
    </Popup>
  );
};
