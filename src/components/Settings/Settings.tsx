import { Button } from '~/components/Button';
import { SettingsModal } from '~/components/SettingsModal';
import { Tooltip } from '~/components/Tooltip';
import { useIntro } from '~/contexts/IntroContext';
import { useModal } from '~/hooks/use-modal';
import { SettingsIcon } from '~/icons/SettingsIcon';

export const Settings = () => {
  const { openModal, closeModal, isOpen } = useModal();
  const { mark } = useIntro();

  const handleOpenSettings = () => {
    openModal();
    mark('settings');
  };

  return (
    <>
      <Tooltip title="Open settings">
        <Button icon={<SettingsIcon />} active={isOpen} color="primary" onClick={handleOpenSettings} />
      </Tooltip>

      <SettingsModal open={isOpen} onClose={closeModal} />
    </>
  );
};
