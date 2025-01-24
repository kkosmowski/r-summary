import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { AppSettings, Setting, SettingKey, SettingValue } from '~/types/settings';
import { SETTINGS } from '~/consts/settings';

type SettingsContextValue = {
  settings: Setting[];
  getValue: (key: SettingKey) => SettingValue | null;
  setSetting: (key: SettingKey, value: SettingValue) => void;
};

const settingsLsKey = 'settings' as const;

function cacheSettings(settings: AppSettings) {
  localStorage.setItem(settingsLsKey, JSON.stringify(settings));
}

function getColumns(defaultValue: number): number {
  if (!window) return defaultValue;

  const screenWidth = window.outerWidth;
  let value = 1;

  if (screenWidth > 3600) value = 6;
  else if (screenWidth > 2400) value = 4;
  else if (screenWidth > 1900) value = 3;
  else if (screenWidth < 1300) value = 2;

  return value;
}

export const getAvailableSettings = () => {
  let settings: AppSettings | null = JSON.parse(localStorage.getItem(settingsLsKey) ?? 'null');

  if (!settings) {
    settings = SETTINGS;
    settings['setting-columns'] = { ...settings['setting-columns'], value: getColumns(2) };
  }

  return settings;
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
      setSettings((current) => ({
        ...current,
        [key]: { ...current[key], value },
      }));
    },
    [setSettings],
  );

  useEffect(() => {
    cacheSettings(settings);
  }, [settings]);

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
