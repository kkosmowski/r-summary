import { HelpIcon } from 'src/icons/HelpIcon';
import { Tooltip } from 'src/components/Tooltip';
import { SelectSetting } from 'src/types/settings';

import styles from '../../SettingsModal.module.scss';

export const SelectSettingItem = ({ setting }: { setting: SelectSetting }) => {
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

      <select value={setting.value}>
        {setting.options.map((option) => {
          const value = typeof option === 'object' ? option.value : option;
          const label = typeof option === 'object' ? option.label : option;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
