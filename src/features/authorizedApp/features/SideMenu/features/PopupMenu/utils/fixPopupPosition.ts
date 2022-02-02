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

/**
 * Returns potentially corrected coordinates of the element so that it
 * doesn't cross the boundaries of the window.
 */
function correctIfOutsideOfTheScreen(
  x: number,
  y: number,
  element: HTMLElement,
) {
  const { offsetWidth: elementWidth } = element;
  const { clientWidth: windowWidth } = document.documentElement;

  const { offsetHeight: elementHeight } = element;
  const { clientHeight: windowHeight } = document.documentElement;

  if (x < 0) x = 0;
  if (x + elementWidth > windowWidth) x = windowWidth - elementWidth;

  if (y < 0) y = 0;
  if (y + elementHeight > windowHeight) y = windowHeight - elementHeight;

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
  let x: number;
  let y: number;

  if (showOn === "click") {
    ({ x, y } = getTriggerElementCenterAlignedCoords(
      triggerElement,
      popupElement,
    ));
  } else {
    ({ x, y } = triggerEventCoords);
  }

  ({ x, y } = correctIfOutsideOfTheScreen(x, y, popupElement));

  setPopupCoordinates(popupElement, x, y);
}

export { fixPopupPosition };
