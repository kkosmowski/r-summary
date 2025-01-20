import { HelpIcon } from '~/icons/HelpIcon';
import { Tooltip } from '~/components/Tooltip';
import { BooleanSetting } from '~/types/settings';

import styles from '../../SettingsModal.module.scss';

export const BooleanSettingItem = ({ setting }: { setting: BooleanSetting }) => {
  return (
    <div className={styles.settingItem}>
      <p>
        <span>{setting.label}</span>
        {setting.helperText && (
          <Tooltip title={setting.helperText}>
            <HelpIcon size={16} />
          </Tooltip>
        )}
      </p>

      <input type="checkbox" name={setting.key} checked={setting.value as boolean} />
    </div>
  );
};
