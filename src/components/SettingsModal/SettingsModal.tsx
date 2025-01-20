import { Modal, type ModalProps } from '~/components/Modal';
import { useSettings } from '~/contexts/SettingsContext';

import styles from './SettingsModal.module.scss';
import { SettingItem } from './components/SettingItem';

export const SettingsModal = ({ isOpen, onClose }: Pick<ModalProps, 'isOpen' | 'onClose'>) => {
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
