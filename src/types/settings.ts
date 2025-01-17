export type BaseSetting = {
  key: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
};

export type SelectSetting = BaseSetting & {
  type: 'select';
  defaultValue: string | number;
  value: string | number;
  options: string[] | number[] | { label: string; value: number | string }[];
};

export type BooleanSetting = BaseSetting & {
  type: 'boolean';
  defaultValue: boolean;
  value: boolean;
};

export type NumberSetting = BaseSetting & {
  type: 'number';
  defaultValue: number;
  value: number;
  min?: number;
  max?: number;
};

export type SettingType = 'select' | 'boolean' | 'number';
export type Setting = SelectSetting | BooleanSetting | NumberSetting;
export type AppSettings = Setting[];
