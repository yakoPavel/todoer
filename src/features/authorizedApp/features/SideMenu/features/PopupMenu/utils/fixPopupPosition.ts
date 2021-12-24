/**
 * Returns coordinates of the `popup` aligned to the center of the `triggerElement`.
 */
function getTriggerElementCenterAlignedCoords(
  triggerElement: HTMLElement,
  popupElement: HTMLElement,
) {
  const {
    x: triggerX,
    y: triggerY,
    height: triggerHeight,
    width: triggerWidth,
  } = triggerElement.getBoundingClientRect();
  const popupWidth = popupElement.offsetWidth;

  let x = triggerX + triggerWidth / 2 - popupWidth / 2;
  if (x < 0) x = 0;

  const y = triggerY + triggerHeight / 2;

  return { x, y };
}

/** Sets the `popupElement`'s coordinates. */
function setPopupCoordinates(popupElement: HTMLElement, x: number, y: number) {
  // eslint-disable-next-line no-param-reassign
  popupElement.style.left = `${x}px`;
  // eslint-disable-next-line no-param-reassign
  popupElement.style.top = `${y}px`;
}

type Options = {
  showOn: "click" | "contextmenu";
  triggerElement: HTMLElement;
  popupElement: HTMLElement;
  triggerEventCoords: { x: number; y: number };
};
/**
 * Corrects the popup position on the screen. The actual placement variant
 * depends on the `showOn` option. If it is "click", aligns the popup by the
 * middle of the `triggerElement`. If it is "contextmenu", the popup will be
 * aligned by the `triggerEventCoords` coordinates.
 * */
function fixPopupPosition({
  showOn,
  triggerElement,
  popupElement,
  triggerEventCoords,
}: Options) {
  if (showOn === "click") {
    const { x, y } = getTriggerElementCenterAlignedCoords(
      triggerElement,
      popupElement,
    );
    setPopupCoordinates(popupElement, x, y);
  } else {
    setPopupCoordinates(
      popupElement,
      triggerEventCoords.x,
      triggerEventCoords.y,
    );
  }
}

export { fixPopupPosition };
