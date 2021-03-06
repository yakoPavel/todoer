import React from "react";

import { dismissPopup } from "../utils/dismissPopup";
import { fixPopupPosition } from "../utils/fixPopupPosition";

function usePopupMenu(showOn: "click" | "contextmenu") {
  const [triggerElement, setTriggerElement] =
    React.useState<HTMLElement | null>(null);
  /* Pointer coordinates of the event that caused the popup to show. */
  const [triggerEventCoords, setTriggerEventCoords] = React.useState({
    x: 0,
    y: 0,
  });
  const [popupElement, setPopupElement] = React.useState<HTMLElement | null>(
    null,
  );
  const [showPopup, setShowPopup] = React.useState(false);

  React.useEffect(() => {
    if (triggerElement === null) return;

    const triggeringHandler = (event: MouseEvent) => {
      event.preventDefault();
      setTriggerEventCoords({ x: event.clientX, y: event.clientY });
      setShowPopup(true);
    };

    triggerElement.addEventListener(showOn, triggeringHandler);

    return () => triggerElement.removeEventListener(showOn, triggeringHandler);
  }, [triggerElement, showOn]);

  // Places the popup at the right spot on the screen
  React.useLayoutEffect(() => {
    if (!showPopup || popupElement === null || triggerElement === null) return;
    fixPopupPosition({
      showOn,
      triggerElement,
      popupElement,
      triggerEventCoords,
    });
  }, [popupElement, triggerElement, triggerEventCoords, showOn, showPopup]);

  // Hides the popup on click
  React.useEffect(() => {
    if (popupElement === null || triggerElement === null) return;

    const hidePopup = dismissPopup.bind(
      null,
      setShowPopup,
      triggerElement,
      showOn,
    );

    document.documentElement.addEventListener("click", hidePopup);
    document.documentElement.addEventListener("contextmenu", hidePopup);

    return () => {
      document.documentElement.removeEventListener("click", hidePopup);
      document.documentElement.removeEventListener("contextmenu", hidePopup);
    };
  }, [popupElement, triggerElement, showOn]);

  React.useEffect(() => {
    if (popupElement === null || triggerElement === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (["Escape", "Space", "Enter"].includes(event.code)) {
        setShowPopup(false);
      }
    };

    document.documentElement.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.removeEventListener("keydown", onKeyDown);
    };
  }, [popupElement, triggerElement]);

  return {
    isPopupVisible: showPopup,
    triggerRef: setTriggerElement,
    popupRef: setPopupElement,
  };
}

export { usePopupMenu };
