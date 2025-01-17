import { HelpIcon } from 'src/icons/HelpIcon';
import { Tooltip } from 'src/components/Tooltip';
import { NumberSetting } from 'src/types/settings';

import styles from '../../SettingsModal.module.scss';

export const NumberSettingItem = ({ setting }: { setting: NumberSetting }) => {
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

      <input type="number" min={setting.min} max={setting.max} value={setting.value} />
    </div>
  );
};
