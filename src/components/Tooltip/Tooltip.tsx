import { PropsWithChildren, ReactNode, useState, MouseEvent, useRef } from 'react';

import styles from './Tooltip.module.scss';

type TooltipProps = PropsWithChildren<{
  title: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}>;

const TOOLTIP_SPACING = 8;

type Position = { left: number; top: number };

const getPosition = (rect: DOMRect, placement: TooltipProps['placement'], tooltipRect: DOMRect): Position => {
  switch (placement) {
    case 'top': {
      const left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      const top = rect.top - tooltipRect.height - TOOLTIP_SPACING;
      return { left, top };
    }
    case 'bottom': {
      const left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      const top = rect.top + rect.height + TOOLTIP_SPACING;
      return { left, top };
    }
    case 'left': {
      const left = rect.left - tooltipRect.width - TOOLTIP_SPACING;
      const top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      return { left, top };
    }
    case 'right': {
      const left = rect.left + rect.width + TOOLTIP_SPACING;
      const top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      return { left, top };
    }
  }

  throw Error(`Unknown placement: "${placement}".`);
};

export const Tooltip = ({ title, placement = 'right', children }: TooltipProps) => {
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = (e: MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const tooltipRect = tooltipRef.current!.getBoundingClientRect();

    setPosition(getPosition(rect, placement, tooltipRect));
  };

  const hideTooltip = () => setPosition(undefined);

  return (
    <>
      <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.wrapper}>
        {children}
      </span>

      <span ref={tooltipRef} className={styles.title} style={position ? { ...position } : { visibility: 'hidden' }}>
        {title}
      </span>
    </>
  );
};
