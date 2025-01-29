import { MouseEvent, useState } from 'react';

import { Button } from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { FiltersIcon } from '~/icons/FiltersIcon';

import { GlobalFiltersPopup } from './components/GlobalFiltersPopup';

export const GlobalFilters = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleToggleFilters = (e: MouseEvent<HTMLElement>) => {
    setAnchor((anchor) => (anchor ? null : (e.target as HTMLElement)));
  };

  const closeFilters = () => {
    setAnchor(null);
  };

  return (
    <>
      <Tooltip title="Global filters">
        <Button icon={<FiltersIcon />} active={!!anchor} color="primary" onClick={handleToggleFilters} />
      </Tooltip>

      <GlobalFiltersPopup anchor={anchor} onClose={closeFilters} />
    </>
  );
};
