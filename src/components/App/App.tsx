import { Dashboard } from '~/components/Dashboard';
import { useSettings } from '~/contexts/SettingsContext';
import { SETTINGS } from '~/consts/settings.ts';

const applyTheme = (theme: string) => {
  for (const option of SETTINGS['setting-theme'].options) {
    const { value } = option as { value: string; label: string };
    document.body.classList.remove(`--${value}`);
  }

  document.body.classList.add(`--${theme}`);
};

export const App = () => {
  const { getValue } = useSettings();
  const isCondensedView = getValue('setting-condensed-view') as boolean;
  const theme = getValue('setting-theme') as string;

  applyTheme(theme);

  if (isCondensedView) {
    document.body.classList.add('--condensed');
  } else {
    document.body.classList.remove('--condensed');
  }

  return <Dashboard />;
};
