import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { SettingsController } from '~/contexts/SettingsContext';
import { App } from '~/components/App';
import '~/styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsController>
      <App />
    </SettingsController>
  </StrictMode>,
);
