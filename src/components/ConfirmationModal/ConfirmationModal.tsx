import { ReactNode } from 'react';

import { Modal, ModalProps } from '~/components/Modal';

import styles from './ConfirmationModal.module.scss';

export type ConfirmationModalProps = ModalProps & {
  message: ReactNode;
  onConfirm: VoidFunction;
  confirm?: {
    label?: string;
    color?: 'success' | 'error';
  };
};

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { open, title, message, confirm = { label: 'Confirm' }, onConfirm, onClose } = props;

  return (
    <Modal noMinHeight className={styles.modal} open={open} title={title} closeOnBackdrop={false} closeButton={false}>
      <p>{message}</p>

      <footer className={styles.actions}>
        <button onClick={onClose}>Cancel</button>
        <button className={confirm.color ? `--${confirm.color}` : ''} onClick={onConfirm}>
          {confirm.label}
        </button>
      </footer>
    </Modal>
  );
};
