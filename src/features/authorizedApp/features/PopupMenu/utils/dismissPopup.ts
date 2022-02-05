/**
 * Hides a popup when the user clicks somewhere else.
 *
 * @param setShowPopup - A React state setter that controls the popup visibility.
 * @param triggerElement - An element that is used as a trigger for the popup
 * shows.
 * @param showOn - Which event triggers the popup.
 * @param event - A click/contextmenu event.
 */
function dismissPopup(
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  triggerElement: HTMLElement,
  showOn: "click" | "contextmenu",
  event: MouseEvent,
) {
  if (showOn !== event.type) setShowPopup(false);

  let target = event.target as HTMLElement | null;
  do {
    if (target === triggerElement) return;
    target = target?.parentElement ?? null;
  } while (target !== null);

  setShowPopup(false);
}

export { dismissPopup };
