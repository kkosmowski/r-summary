import { Button } from '~/components/Button';
import { Popup, PopupProps } from '~/components/Popup';
import { Tooltip } from '~/components/Tooltip';
import { FiltersClearIcon } from '~/icons/FiltersClearIcon';
import { SaveIcon } from '~/icons/SaveIcon';

import styles from './FiltersPopup.module.scss';

type FiltersPopupProps = PopupProps & {
  clearDisabled?: boolean;
  onSave?: VoidFunction;
  onClear: VoidFunction;
};

export const FiltersPopup = ({ onClear, onSave, clearDisabled, children, ...rest }: FiltersPopupProps) => {
  return (
    <Popup {...rest}>
      <section className={styles.filters}>{children}</section>

      <footer className={styles.buttons}>
        {onSave && (
          <Tooltip title="Save your filters so that they are applied whenever you browse">
            <Button color="primary" withIcon={<SaveIcon />} onClick={onSave}>
              Save as default
            </Button>
          </Tooltip>
        )}

        <Button withIcon={<FiltersClearIcon />} disabled={clearDisabled} onClick={onClear}>
          Clear filters
        </Button>
      </footer>
    </Popup>
  );
};
