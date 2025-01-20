import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { AppSettings, Setting, SettingKey, SettingValue } from '~/types/settings';
import { SETTINGS } from '~/consts/settings';

type SettingsContextValue = {
  settings: Setting[];
  getValue: (key: SettingKey) => SettingValue | null;
  setSetting: (key: SettingKey, value: SettingValue) => void;
};

function getSetting(setting: Setting | SettingKey, fallbackToDefault: boolean): SettingValue | null {
  const settingKey = typeof setting === 'string' ? setting : setting.key;
  const settingDefaultValue = fallbackToDefault ? (typeof setting === 'string' ? null : setting.defaultValue) : null;
  const string = localStorage.getItem(settingKey);

  if (!string) return settingDefaultValue;

  return JSON.parse(string).value;
}

function cacheSetting(settingKey: string, value: SettingValue) {
  localStorage.setItem(settingKey, JSON.stringify({ value }));
}

function getColumns(defaultValue: number): number {
  const columnsSettingKey: SettingKey = SETTINGS['setting-columns'].key;
  if (!window) return defaultValue;

  const cached = getSetting(columnsSettingKey, false) as number | null;
  if (cached) return cached;

  const screenWidth = window.outerWidth;
  let value = 1;

  if (screenWidth > 3600) value = 6;
  else if (screenWidth > 2400) value = 4;
  else if (screenWidth > 1900) value = 3;
  else if (screenWidth < 1300) value = 2;

  cacheSetting(columnsSettingKey, value);
  return value;
}

export const getAvailableSettings = () => {
  const settings: Record<string, Setting> = {};

  for (const [key, setting] of Object.entries(SETTINGS)) {
    if (key === SETTINGS['setting-columns'].key) {
      settings[key] = { ...setting, value: getColumns(2) } as Setting;
    } else {
      settings[key] = { ...setting, value: getSetting(setting, true) } as Setting;
    }
  }

  return settings as AppSettings;
};

const defaultSettingsContextValue = {
  settings: [],
  getValue: () => false,
  setSetting: () => {},
};

const SettingsContext = createContext<SettingsContextValue>(defaultSettingsContextValue);

export const SettingsController = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<AppSettings>(getAvailableSettings());

  const setSetting = useCallback(
    (key: SettingKey, value: SettingValue) => {
      if (!SETTINGS.hasOwnProperty(key)) {
        console.error(`Unknown setting key: "${key}".`);
        return;
      }

      cacheSetting(key, value);
      setSettings((current) => ({
        ...current,
        [key]: { ...current[key], value },
      }));
    },
    [setSettings],
  );

  const settingsArray = Object.values(settings);

  const getValue = useCallback((key: SettingKey) => settings[key].value, [settings]);

  return (
    <SettingsContext.Provider value={{ settings: settingsArray, getValue, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
