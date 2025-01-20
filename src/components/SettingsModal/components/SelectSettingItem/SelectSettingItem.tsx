import { HelpIcon } from '~/icons/HelpIcon';
import { Tooltip } from '~/components/Tooltip';
import { SelectSetting } from '~/types/settings';

import styles from '../../SettingsModal.module.scss';
import { ChangeEvent, useCallback, useState } from 'react';
import { useSettings } from '~/contexts/SettingsContext';

export const SelectSettingItem = ({ setting }: { setting: SelectSetting }) => {
  const [value, setValue] = useState<string | number>(setting.value);
  const { setSetting } = useSettings();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const isString = typeof setting.value === 'string';
      const newValue = isString ? event.target.value : +event.target.value;

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

      <select value={value} onChange={handleChange}>
        {setting.options.map((option) => {
          const optValue = typeof option === 'object' ? option.value : option;
          const optLabel = typeof option === 'object' ? option.label : option;

          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
};
