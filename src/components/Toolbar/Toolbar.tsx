import { SettingsIcon } from '~/icons/SettingsIcon';
import { useModal } from '~/hooks/use-modal';
import { SettingsModal } from '~/components/SettingsModal';
import { AddFeed } from '~/components/AddFeed';
import { Button } from '~/components/Button';

import styles from './Toolbar.module.scss';

export const Toolbar = () => {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <header className={styles.toolbar}>
      <section className={styles.left}>
        <AddFeed />
      </section>

      <section className={styles.right}>
        <Button icon={<SettingsIcon />} color="primary" onClick={openModal} />
      </section>

      <SettingsModal open={isOpen} onClose={closeModal} />
    </header>
  );
};
