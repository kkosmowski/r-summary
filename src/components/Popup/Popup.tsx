import { PropsWithChildren } from 'react';
import { Backdrop } from '~/components/Backdrop';

import styles from './Popup.module.scss';

const POPUP_GAP = 8;

export type PopupProps = PropsWithChildren & {
  anchor: HTMLElement | null;
  open: boolean;
  onClose?: VoidFunction;
};

const getPositionStyle = (anchor: HTMLElement) => {
  const { left, top, height } = anchor.getBoundingClientRect();

  return { left, top: top + height + POPUP_GAP };
};

export const Popup = ({ open, anchor, children, onClose }: PopupProps) => {
  if (!anchor || !open) return null;

  const positionStyle = getPositionStyle(anchor);

  return (
    <div className={styles.popupContainer}>
      <aside className={`${styles.popup} popup`} style={positionStyle}>
        {children}
      </aside>
      <Backdrop transparent onClose={onClose} />
    </div>
  );
};
