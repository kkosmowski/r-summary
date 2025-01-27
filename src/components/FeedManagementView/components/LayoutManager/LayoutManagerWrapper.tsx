import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { LayoutManager } from './LayoutManager';
import styles from './LayoutManager.module.scss';

export const LayoutManagerWrapper = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [warningVisible, setWarningVisible] = useState(false);
  const [debouncedWarningVisible] = useDebounce(warningVisible, 100);

  const refreshWarningStatus = () => {
    setWarningVisible(!!sectionRef.current && sectionRef.current.scrollWidth > sectionRef.current.clientWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', refreshWarningStatus);
    refreshWarningStatus();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <hgroup className={styles.hgroup}>
        <h4>Layout</h4>

        <span className={styles.description}>Drag-n-drop your feeds to change the order.</span>

        {debouncedWarningVisible && (
          <span className={styles.warning}>Too many columns – dragging may not work properly.</span>
        )}
      </hgroup>

      <DndProvider backend={HTML5Backend}>
        <LayoutManager />
      </DndProvider>
    </section>
  );
};
