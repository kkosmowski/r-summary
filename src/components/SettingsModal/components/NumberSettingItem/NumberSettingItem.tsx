import { HelpIcon } from '~/icons/HelpIcon';
import { Tooltip } from '~/components/Tooltip';
import { NumberSetting } from '~/types/settings';

import styles from '../../SettingsModal.module.scss';
import { useSettings } from '~/contexts/SettingsContext';
import { ChangeEvent, useCallback, useState } from 'react';

export const NumberSettingItem = ({ setting }: { setting: NumberSetting }) => {
  const [value, setValue] = useState<number>(setting.value);
  const { setSetting } = useSettings();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = +event.target.value;

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

      <input type="number" min={setting.min} max={setting.max} value={value} onChange={handleChange} />
    </div>
  );
};
