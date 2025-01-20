import { Modal, type ModalProps } from '~/components/Modal';

import styles from './SettingsModal.module.scss';
import { SettingItem } from './components/SettingItem';
import { useSettings } from '~/contexts/SettingsContext';

export const SettingsModal = ({ isOpen, onClose }: ModalProps) => {
  const { settings } = useSettings();

  return (
    <Modal title="Settings" isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
      <div className={styles.settingsList}>
        {settings.map((setting) => (
          <SettingItem key={setting.key} setting={setting} />
        ))}
      </div>
    </Modal>
  );
};
