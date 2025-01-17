import { PropsWithChildren, ReactNode } from 'react';

import { CloseIcon } from 'src/icons/CloseIcon';

import styles from './Modal.module.scss';

export type ModalProps = {
  title: ReactNode;
  isOpen: boolean;
  onClose?: VoidFunction;
  closeOnBackdrop?: boolean;
  hideBackdrop?: boolean;
};

export const Modal = ({
  children,
  title,
  isOpen,
  closeOnBackdrop = true,
  hideBackdrop,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <aside className={styles.modal}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          <button className={`--icon ${styles.closeButton}`} onClick={onClose}>
            <CloseIcon />
          </button>
        </header>

        <section>{children}</section>
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
