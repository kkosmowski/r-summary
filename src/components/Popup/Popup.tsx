import { MouseEventHandler, PropsWithChildren } from 'react';
import { Backdrop } from '~/components/Backdrop';
import { cn } from '~/utils/cn';

import styles from './Popup.module.scss';

const POPUP_GAP = 8;

export type PopupProps = PropsWithChildren & {
  anchor: HTMLElement | null;
  open: boolean;
  onClose?: VoidFunction;
  onClick?: MouseEventHandler;
};

const getPositionStyle = (anchor: HTMLElement) => {
  const { left, top, height } = anchor.getBoundingClientRect();

  return { left, top: top + height + POPUP_GAP };
};

export const Popup = ({ open, anchor, children, onClick, onClose }: PopupProps) => {
  if (!anchor || !open) return null;

  const positionStyle = getPositionStyle(anchor);

  return (
    <div className={styles.popupContainer} onClick={onClick}>
      <aside className={cn(styles.popup, 'popup')} style={positionStyle}>
        {children}
      </aside>
      <Backdrop transparent onClose={onClose} />
    </div>
  );
};
