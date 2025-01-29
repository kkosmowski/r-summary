import { PropsWithChildren, ReactNode } from 'react';
import { Backdrop } from '~/components/Backdrop';

import { CloseIcon } from '~/icons/CloseIcon';

import styles from './Modal.module.scss';
import { Button } from '~/components/Button';

export type ModalProps = {
  title: ReactNode;
  open: boolean;
  noMinHeight?: boolean;
  wide?: boolean;
  className?: string;
  onClose?: VoidFunction;
  closeButton?: boolean;
  closeOnBackdrop?: boolean;
  hideBackdrop?: boolean;
};

export const Modal = ({
  children,
  title,
  open,
  noMinHeight,
  wide,
  className,
  closeButton = true,
  closeOnBackdrop = true,
  hideBackdrop,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  if (!open) return null;

  return (
    <div className={styles.modalContainer}>
      <aside className={`${styles.modal} ${noMinHeight && styles.noMinHeight} ${wide && styles.wide}`}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          {closeButton && <Button icon={<CloseIcon />} className={styles.closeButton} onClick={() => onClose?.()} />}
        </header>

        <section className={`${styles.content} ${className ?? ''}`}>{children}</section>
      </aside>

      <Backdrop hide={hideBackdrop} closeOnBackdrop={closeOnBackdrop} onClose={onClose} />
    </div>
  );
};
