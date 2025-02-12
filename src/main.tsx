import { createRoot } from 'react-dom/client';

import { App } from '~/components/App';
import { AppProviders } from '~/components/AppProviders';
import '~/styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
