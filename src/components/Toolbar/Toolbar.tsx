import { SettingsIcon } from '~/icons/SettingsIcon';
import { useModal } from '~/hooks/use-modal';
import { SettingsModal } from '~/components/SettingsModal';
import { AddFeed } from '~/components/AddFeed';

import styles from './Toolbar.module.scss';

export const Toolbar = () => {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <header className={styles.toolbar}>
      <section className={styles.left}>
        <AddFeed />
      </section>

      <section className={styles.right}>
        <button className="--icon --primary" onClick={openModal}>
          <SettingsIcon />
        </button>
      </section>

      <SettingsModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
};
