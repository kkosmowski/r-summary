import { ReactNode } from 'react';

import { Modal, ModalProps } from '~/components/Modal';
import { Button } from '~/components/Button';
import { Color } from '~/types/ui';

import styles from './ConfirmationModal.module.scss';

export type ConfirmationModalProps = ModalProps & {
  message: ReactNode;
  onConfirm: VoidFunction;
  confirm?: {
    label?: string;
    color?: Color;
  };
};

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { open, title, message, confirm = { label: 'Confirm' }, onConfirm, onClose } = props;

  return (
    <Modal noMinHeight className={styles.modal} open={open} title={title} closeOnBackdrop={false} closeButton={false}>
      <p>{message}</p>

      <footer className={styles.actions}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color={confirm.color} onClick={onConfirm}>
          {confirm.label}
        </Button>
      </footer>
    </Modal>
  );
};
