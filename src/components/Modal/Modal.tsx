import { PropsWithChildren, ReactNode } from 'react';

import { CloseIcon } from '~/icons/CloseIcon';

import styles from './Modal.module.scss';
import { Button } from '~/components/Button';

export type ModalProps = {
  title: ReactNode;
  open: boolean;
  noMinHeight?: boolean;
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
  className,
  closeButton = true,
  closeOnBackdrop = true,
  hideBackdrop,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  if (!open) return null;

  return (
    <div className={styles.modalContainer}>
      <aside className={`${styles.modal} ${noMinHeight && styles.noMinHeight}`}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          {closeButton && <Button icon={<CloseIcon />} className={styles.closeButton} onClick={() => onClose?.()} />}
        </header>

        <section className={className}>{children}</section>
      </aside>

      {!hideBackdrop && (
        <div
          className={`${styles.backdrop} ${!closeOnBackdrop ? styles.disabled : ''}`}
          onClick={() => (closeOnBackdrop ? onClose?.() : undefined)}
        />
      )}
    </div>
  );
};
