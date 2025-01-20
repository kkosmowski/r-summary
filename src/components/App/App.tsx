import { Dashboard } from '~/components/Dashboard';
import { useSettings } from '~/contexts/SettingsContext';

export const App = () => {
  const { getValue } = useSettings();
  const isCondensedView = getValue('setting-condensed-view') as boolean;

  if (isCondensedView) {
    document.body.classList.add('--condensed');
  } else {
    document.body.classList.remove('--condensed');
  }

  return <Dashboard />;
};
