import { SettingsIcon } from 'src/icons/SettingsIcon';
import { useModal } from 'src/hooks/use-modal';
import { SettingsModal } from 'src/components/SettingsModal';

import styles from './Toolbar.module.scss';

export const Toolbar = () => {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <header className={styles.toolbar}>
      <section className={styles.right}>
        <button className="--icon --primary" onClick={openModal}>
          <SettingsIcon />
        </button>
      </section>

      <SettingsModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
};
