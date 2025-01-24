import { useState } from 'react';

import { AddFeedForm } from '~/components/AddFeedForm';
import { AddIcon } from '~/icons/AddIcon.tsx';

export const AddFeed = () => {
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdding) {
    return (
      <button className="--icon --primary" onClick={() => setIsAdding(true)}>
        <AddIcon />
      </button>
    );
  }

  const handleAdd = () => {
    // @todo
  };

  return <AddFeedForm onClose={() => setIsAdding(false)} onAdd={handleAdd} />;
};
