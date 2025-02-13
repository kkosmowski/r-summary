import { useState } from 'react';
import { GlobalFilters } from '~/components/GlobalFilters';
import { useIntro } from '~/contexts/IntroContext';

import { useSubreddits } from '~/contexts/SubredditsContext';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { DashboardIcon } from '~/icons/DashboardIcon';
import { useToggle } from '~/hooks/use-toggle';

import { FeedManagementModal } from './components/FeedManagementModal';
import { AddFeedFormWrapper } from './components/AddFeedFormWrapper';

export const FeedManagement = () => {
  const { add } = useSubreddits();
  const { onlyAddLeft, isFinished, mark } = useIntro();
  const { open: openManagementModal, isOpen: isManagementModalOpen, close: closeManagementModal } = useToggle();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (subreddit: string) => {
    add(subreddit);
    mark('add-feed');
  };

  const handleManageFeeds = () => {
    openManagementModal();
    mark('manage-feeds');
  };

  if (!isAdding) {
    return (
      <>
        <Tooltip title="Add new feed">
          <Button
            icon={<AddIcon />}
            color="primary"
            disabled={!isFinished('add-feed') && !onlyAddLeft}
            onClick={() => setIsAdding(true)}
          />
        </Tooltip>

        <Tooltip title="Manage feeds">
          <Button icon={<DashboardIcon />} active={isManagementModalOpen} color="primary" onClick={handleManageFeeds} />
        </Tooltip>

        <GlobalFilters />

        <FeedManagementModal open={isManagementModalOpen} onClose={closeManagementModal} />
      </>
    );
  }

  return <AddFeedFormWrapper onClose={() => setIsAdding(false)} onAdd={handleAdd} />;
};
