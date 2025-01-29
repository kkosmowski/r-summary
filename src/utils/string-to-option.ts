import { Option } from '~/types/ui';

export const stringToOption = (string: string, uppercase = false): Option => ({
  label: uppercase ? string.slice(0, 1).toUpperCase() + string.slice(1) : string,
  value: string,
});
