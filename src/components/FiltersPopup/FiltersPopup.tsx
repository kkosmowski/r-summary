import { Button } from '~/components/Button';
import { Popup, PopupProps } from '~/components/Popup';
import { FiltersClearIcon } from '~/icons/FiltersClearIcon';
import { SaveIcon } from '~/icons/SaveIcon';

import styles from './FiltersPopup.module.scss';

export const FiltersPopup = ({ anchor, children, onClose }: PopupProps) => {
  return (
    <Popup anchor={anchor} onClose={onClose}>
      <section className={styles.filters}>{children}</section>

      <footer className={styles.buttons}>
        <Button color="primary" withIcon={<SaveIcon />}>
          Save
        </Button>
        <Button withIcon={<FiltersClearIcon />}>Clear</Button>
      </footer>
    </Popup>
  );
};
