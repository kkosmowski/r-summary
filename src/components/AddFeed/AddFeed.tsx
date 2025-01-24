import { useState } from 'react';

import { useSubreddits } from '~/contexts/SubredditsContext';
import { AddFeedForm } from '~/components/AddFeedForm';
import { AddIcon } from '~/icons/AddIcon';

export const AddFeed = () => {
  const { add } = useSubreddits();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdding) {
    return (
      <button className="--icon --primary" onClick={() => setIsAdding(true)}>
        <AddIcon />
      </button>
    );
  }

  return <AddFeedForm onClose={() => setIsAdding(false)} onAdd={add} />;
};
