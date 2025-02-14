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

  const registerBackdrop = () => {
    const currentDepth = Number(document.body.dataset.backdropDepth ?? 0);

    if (currentDepth === 0) {
      document.body.style.overflow = 'hidden';
    }

    const newDepth = currentDepth + 1;
    document.body.dataset.backdropDepth = String(newDepth);
  };

  const unregisterBackdrop = () => {
    const currentDepth = Number(document.body.dataset.backdropDepth ?? 0);

    if (currentDepth === 0) {
      console.error('Error: Backdrop is to be unregistered, but depth is 0.');
    }

    const newDepth = currentDepth - 1;

    if (newDepth === 0) {
      document.body.style.overflow = '';
      delete document.body.dataset.backdropDepth;
    } else {
      document.body.dataset.backdropDepth = String(newDepth);
    }
  };

  useEffect(() => {
    registerBackdrop();

    return () => {
      unregisterBackdrop();
    };
  }, []);

  return (
    <div
      className={cn(styles.backdrop, transparent && styles.transparent, !closeOnBackdrop && styles.disabled)}
      onClick={() => (closeOnBackdrop ? onClose?.() : undefined)}
    />
  );
};
