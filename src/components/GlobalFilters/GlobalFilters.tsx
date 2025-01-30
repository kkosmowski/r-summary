import { useRef, useState } from 'react';
import { Badge } from '~/components/Badge';

import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { FiltersIcon } from '~/icons/FiltersIcon';

import { GlobalFiltersPopup } from './components/GlobalFiltersPopup';
import { useGlobalFilters } from './hooks/use-global-filters';

export const GlobalFilters = () => {
  const anchor = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const { activeFilters } = useGlobalFilters();

  const handleToggleFilters = () => {
    setOpen(true);
  };

  const closeFilters = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Global filters">
        <Badge label={activeFilters}>
          <Button ref={anchor} icon={<FiltersIcon />} active={open} color="primary" onClick={handleToggleFilters} />
        </Badge>
      </Tooltip>

      <GlobalFiltersPopup anchor={anchor.current} open={open} onClose={closeFilters} />
    </>
  );
};
