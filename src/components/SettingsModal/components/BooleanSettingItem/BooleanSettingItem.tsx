import { HelpIcon } from '~/icons/HelpIcon';
import { Tooltip } from '~/components/Tooltip';
import { BooleanSetting } from '~/types/settings';

import styles from '../../SettingsModal.module.scss';
import { ChangeEvent, useCallback, useState } from 'react';
import { useSettings } from '~/contexts/SettingsContext';

export const BooleanSettingItem = ({ setting }: { setting: BooleanSetting }) => {
  const [value, setValue] = useState(setting.value);
  const { setSetting } = useSettings();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.checked;

      setSetting(setting.key, newValue);
      setValue(newValue);
    },
    [setSetting, setValue],
  );

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

      <input type="checkbox" name={setting.key} checked={value} onChange={handleChange} />
    </div>
  );
};
