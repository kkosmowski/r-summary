import { PropsWithChildren, ReactNode, useState, MouseEvent, useRef } from 'react';

import styles from './Tooltip.module.scss';
import { getPosition } from '~/components/Tooltip/Tooltip.utils.ts';

export type TooltipProps = PropsWithChildren<{
  title: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}>;

export type TooltipPosition = { left: number; top: number };

export const Tooltip = ({ title, placement, children }: TooltipProps) => {
  const [position, setPosition] = useState<TooltipPosition | undefined>(undefined);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = (e: MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setPosition(getPosition(rect, placement, tooltipRect));
    }
  };

  const hideTooltip = () => setPosition(undefined);

  return (
    <>
      <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.wrapper}>
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
