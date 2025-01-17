import { FC } from 'react';

import { Setting } from 'src/types/settings';
import { SettingType } from 'src/types/settings';

import { BooleanSettingItem } from '../BooleanSettingItem';
import { NumberSettingItem } from '../NumberSettingItem';
import { SelectSettingItem } from '../SelectSettingItem';

const settingItems: Record<SettingType, FC<{ setting: any }>> = {
  boolean: BooleanSettingItem,
  number: NumberSettingItem,
  select: SelectSettingItem,
};

export const SettingItem = ({ setting }: { setting: Setting }) => {
  const Component = settingItems[setting.type];
  return <Component setting={setting} />;
};
