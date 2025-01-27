import { Modal, ModalProps } from '~/components/Modal';
import { FeedManagementView } from '~/components/FeedManagementView';

export const FeedManagementModal = ({ open, onClose }: Pick<ModalProps, 'open' | 'onClose'>) => {
  return (
    <Modal open={open} title="Manage feeds" wide onClose={onClose}>
      <FeedManagementView />
    </Modal>
  );
};
