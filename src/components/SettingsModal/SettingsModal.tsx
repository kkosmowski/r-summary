import { Modal, type ModalProps } from '~/components/Modal';
import { useSettings } from '~/contexts/SettingsContext';

import styles from './SettingsModal.module.scss';
import { SettingItem } from './components/SettingItem';

export const SettingsModal = ({ open, onClose }: Pick<ModalProps, 'open' | 'onClose'>) => {
  const { settings } = useSettings();

  return (
    <Modal title="Settings" open={open} onClose={onClose}>
      <div className={styles.settingsList}>
        {settings.map((setting) => (
          <SettingItem key={setting.key} setting={setting} />
        ))}
      </div>
    </Modal>
  );
};
