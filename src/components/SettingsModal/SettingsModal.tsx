import { Modal, type ModalProps } from 'src/components/Modal';
import { getAvailableSettings } from 'src/consts/settings';

import styles from './SettingsModal.module.scss';
import { SettingItem } from './components/SettingItem';

export const SettingsModal = ({ isOpen, onClose }: ModalProps) => {
  const settings = getAvailableSettings();

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
