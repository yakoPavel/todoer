function isDomRect(object?: Partial<DOMRect> | null): object is DOMRect {
  if (!object) return false;

  return (
    "width" in object && "height" in object && "y" in object && "x" in object
  );
}

/**
 * Positions `ColorInput` popover.
 */
function positionPopover(
  targetRect?: Partial<DOMRect> | null,
  popoverRect?: Partial<DOMRect> | null,
): React.CSSProperties {
  const hidden = {
    visibility: "hidden" as const,
  };
  if (!isDomRect(targetRect) || !isDomRect(popoverRect)) {
    return hidden;
  }
  if (popoverRect.height === 0) {
    return hidden;
  }

  const screenHeight = document.documentElement.clientHeight;

  const bottomSpace = screenHeight - targetRect.y - targetRect.height;
  const topSpace = screenHeight - targetRect.y;

  const result = {
    zIndex: 501,
    position: "fixed" as const,
    width: targetRect.width,
    top: targetRect.y - popoverRect.height,
    left: targetRect.x,
  };

  if (popoverRect.height > bottomSpace && popoverRect.height <= topSpace) {
    return {
      ...result,
      top: targetRect.y - popoverRect.height,
    };
  }

  return {
    ...result,
    top: targetRect.y + targetRect.height,
  };
}

export { positionPopover };
