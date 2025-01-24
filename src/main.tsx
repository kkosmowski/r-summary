import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { SettingsController } from '~/contexts/SettingsContext';
import { SubredditsController } from '~/contexts/SubredditsContext';
import { App } from '~/components/App';
import '~/styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SubredditsController>
      <SettingsController>
        <App />
      </SettingsController>
    </SubredditsController>
  </StrictMode>,
);
