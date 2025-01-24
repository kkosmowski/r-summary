import { useState } from 'react';

import { useSubreddits } from '~/contexts/SubredditsContext';
import { AddFeedForm } from '~/components/AddFeedForm';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';

export const AddFeed = () => {
  const { add } = useSubreddits();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdding) {
    return (
      <Tooltip title="Add new feed">
        <Button icon={<AddIcon />} color="primary" onClick={() => setIsAdding(true)} />
      </Tooltip>
    );
  }

  return <AddFeedForm onClose={() => setIsAdding(false)} onAdd={add} />;
};
