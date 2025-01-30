import { PropsWithChildren, ReactNode, useState, useRef } from 'react';

import { getPosition } from './Tooltip.utils';
import styles from './Tooltip.module.scss';

export type TooltipProps = PropsWithChildren<{
  title: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}>;

export type TooltipPosition = { left: number; top: number };

export const Tooltip = ({ title, placement, children }: TooltipProps) => {
  const [position, setPosition] = useState<TooltipPosition | undefined>(undefined);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();

    if (!rect || !tooltipRect) return;

    setPosition(getPosition(rect, placement, tooltipRect));
  };

  const hideTooltip = () => setPosition(undefined);

  return (
    <>
      <span ref={wrapperRef} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.wrapper}>
        {children}
      </span>

      {!!title && (
        <span
          ref={tooltipRef}
          className={styles.title}
          style={position ? { ...position } : { left: 0, top: 0, visibility: 'hidden' }}
        >
          {title}
        </span>
      )}
    </>
  );
};
