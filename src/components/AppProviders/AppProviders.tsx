import { PropsWithChildren, StrictMode } from 'react';

import { IntroController } from '~/contexts/IntroContext';
import { SettingsController } from '~/contexts/SettingsContext';
import { SubredditsController } from '~/contexts/SubredditsContext';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <StrictMode>
      <IntroController>
        <SubredditsController>
          <SettingsController>{children}</SettingsController>
        </SubredditsController>
      </IntroController>
    </StrictMode>
  );
};
