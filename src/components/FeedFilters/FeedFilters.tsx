import { useRef, useState } from 'react';
import { Badge } from '~/components/Badge';

import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { FiltersIcon } from '~/icons/FiltersIcon';
import { SubredditData } from '~/types/reddit';
import { cn } from '~/utils/cn';

import { FeedFiltersPopup } from './components/FeedFiltersPopup';
import { useFeedFilters } from './hooks/use-feed-filters';

type FeedFiltersProps = {
  subreddit: SubredditData;
  onClose?: VoidFunction;
};

export const FeedFilters = ({ subreddit, onClose }: FeedFiltersProps) => {
  const anchor = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const { activeFilters } = useFeedFilters(subreddit.name);

  const handleToggleFilters = () => {
    setOpen(true);
  };

  const closeFilters = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Tooltip title="Filters">
        <Badge label={activeFilters}>
          <Button
            ref={anchor}
            icon={<FiltersIcon />}
            active={open}
            className={cn(activeFilters && '--visible')}
            color="primary"
            onClick={handleToggleFilters}
          />
        </Badge>
      </Tooltip>

      <FeedFiltersPopup subreddit={subreddit} anchor={anchor.current} open={open} onClose={closeFilters} />
    </>
  );
};
