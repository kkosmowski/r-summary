import { Button } from '~/components/Button';
import { Popup, PopupProps } from '~/components/Popup';
import { FiltersClearIcon } from '~/icons/FiltersClearIcon';

import styles from './FiltersPopup.module.scss';

type FiltersPopupProps = PopupProps & {
  onClear: VoidFunction;
  clearDisabled?: boolean;
};

export const FiltersPopup = ({ onClear, clearDisabled, children, ...rest }: FiltersPopupProps) => {
  return (
    <Popup {...rest}>
      <section className={styles.filters}>{children}</section>

      <footer className={styles.buttons}>
        <Button withIcon={<FiltersClearIcon />} disabled={clearDisabled} onClick={onClear}>
          Clear
        </Button>
      </footer>
    </Popup>
  );
};
