import { useState } from 'react';

import { useSubreddits } from '~/contexts/SubredditsContext';
import { AddFeedForm } from '~/components/AddFeedForm';
import { AddIcon } from '~/icons/AddIcon';
import { Button } from '~/components/Button';

export const AddFeed = () => {
  const { add } = useSubreddits();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdding) {
    return <Button icon={<AddIcon />} color="primary" onClick={() => setIsAdding(true)} />;
  }

  return <AddFeedForm onClose={() => setIsAdding(false)} onAdd={add} />;
};
