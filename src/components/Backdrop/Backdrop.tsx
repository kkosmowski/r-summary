import { useEffect } from 'react';
import { cn } from '~/utils/cn';
import styles from './Backdrop.module.scss';

type BackdropProps = {
  hide?: boolean;
  transparent?: boolean;
  closeOnBackdrop?: boolean;
  onClose?: VoidFunction;
};

export const Backdrop = ({ hide, transparent, closeOnBackdrop = true, onClose }: BackdropProps) => {
  if (hide) return null;

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
  };

  useEffect(() => {
    disableScroll();

    return () => {
      enableScroll();
    };
  }, []);

  return (
    <div
      className={cn(styles.backdrop, transparent && styles.transparent, !closeOnBackdrop && styles.disabled)}
      onClick={() => (closeOnBackdrop ? onClose?.() : undefined)}
    />
  );
};
