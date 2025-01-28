import { useState } from 'react';

import { useSubreddits } from '~/contexts/SubredditsContext';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { DashboardIcon } from '~/icons/DashboardIcon';
import { useModal } from '~/hooks/use-modal';

import { FeedManagementModal } from './components/FeedManagementModal';
import { AddFeedFormWrapper } from './components/AddFeedFormWrapper';

export const FeedManagement = () => {
  const { add } = useSubreddits();
  const {
    openModal: openManagementModal,
    isOpen: isManagementModalOpen,
    closeModal: closeManagementModal,
  } = useModal();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdding) {
    return (
      <>
        <Tooltip title="Add new feed">
          <Button icon={<AddIcon />} color="primary" onClick={() => setIsAdding(true)} />
        </Tooltip>

        <Tooltip title="Manage feeds">
          <Button icon={<DashboardIcon />} color="primary" onClick={openManagementModal} />
        </Tooltip>

        <FeedManagementModal open={isManagementModalOpen} onClose={closeManagementModal} />
      </>
    );
  }

  return <AddFeedFormWrapper onClose={() => setIsAdding(false)} onAdd={add} />;
};
