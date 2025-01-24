import { TooltipPosition, TooltipProps } from './Tooltip';

const TOOLTIP_SPACING = 8;

// autoPlacement prefers right placement, but uses left if cannot fit in visible area
const getAutoPlacement = (rect: DOMRect, tooltipRect: DOMRect): TooltipPosition => {
  const initialPosition = getPosition(rect, 'right', tooltipRect);

  const tooltipEndX = initialPosition.left + TOOLTIP_SPACING + tooltipRect.width;

  if (tooltipEndX <= window.innerWidth) {
    return initialPosition;
  }
  return getPosition(rect, 'left', tooltipRect);
};

const getLeftForTopOrBottom = (rect: DOMRect, tooltipRect: DOMRect): number => {
  const left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  const tooltipEndX = left + TOOLTIP_SPACING + tooltipRect.width;

  if (tooltipEndX > window.innerWidth) {
    return left - (tooltipEndX - window.innerWidth) - TOOLTIP_SPACING * 2;
  }

  if (left <= TOOLTIP_SPACING) {
    return TOOLTIP_SPACING;
  }

  return left;
};

const getTopForLeftOrRight = (rect: DOMRect, tooltipRect: DOMRect): number =>
  rect.top + rect.height / 2 - tooltipRect.height / 2;

export const getPosition = (
  rect: DOMRect,
  placement: TooltipProps['placement'],
  tooltipRect: DOMRect,
): TooltipPosition => {
  switch (placement) {
    case 'top': {
      const left = getLeftForTopOrBottom(rect, tooltipRect);
      const top = rect.top - tooltipRect.height - TOOLTIP_SPACING;
      return { left, top };
    }
    case 'bottom': {
      const left = getLeftForTopOrBottom(rect, tooltipRect);
      const top = rect.top + rect.height + TOOLTIP_SPACING;
      return { left, top };
    }
    case 'left': {
      const left = rect.left - tooltipRect.width - TOOLTIP_SPACING;
      const top = getTopForLeftOrRight(rect, tooltipRect);
      return { left, top };
    }
    case 'right': {
      const left = rect.left + rect.width + TOOLTIP_SPACING;
      const top = getTopForLeftOrRight(rect, tooltipRect);
      return { left, top };
    }
    case undefined:
      return getAutoPlacement(rect, tooltipRect);
  }

  throw Error(`Unknown placement: "${placement}".`);
};
