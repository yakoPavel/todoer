import React from "react";

import PopupMenu, { PopupMenuProps } from "../components/PopupMenu";
import { dismissPopup } from "../utils/dismissPopup";
import { fixPopupPosition } from "../utils/fixPopupPosition";

type WithPopupMenuConfig<Props> = {
  /** A component that will be the target of the popup menu. */
  Component: React.JSXElementConstructor<Props> & { displayName?: string };
  /** A config that will be passed to the {@link PopupMenu}. */
  popupMenuConfig: Omit<PopupMenuProps, "popupId">;
  /** When to show the menu. */
  showOn: "click" | "contextmenu";
  /** A name of the component. */
  componentName?: string;
};

function withPopupMenu<Props>({
  Component,
  popupMenuConfig,
  showOn,
  componentName = Component.displayName ?? Component.name,
}: WithPopupMenuConfig<Props>) {
  const WithPopupMenu = ({
    popupId,
    ...targetComponentProps
  }: Props & { popupId: string }) => {
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

      return () =>
        triggerElement.removeEventListener(showOn, triggeringHandler);
    }, [triggerElement]);

    // Places the popup at the right spot on the screen
    React.useLayoutEffect(() => {
      if (popupElement === null || triggerElement === null) return;
      fixPopupPosition({
        showOn,
        triggerElement,
        popupElement,
        triggerEventCoords,
      });
    }, [popupElement, triggerElement, triggerEventCoords]);

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
    }, [popupElement, triggerElement]);

    return (
      <>
        {/* 
          Typescript can not deduce that `targetComponentProps` are actually 
          the props of this component, so we need to explicitly cast them.
        */}
        <Component
          {...(targetComponentProps as unknown as Props)}
          ref={setTriggerElement}
        />
        {showPopup && (
          <PopupMenu
            ref={setPopupElement}
            popupId={popupId}
            {...popupMenuConfig}
          />
        )}
      </>
    );
  };

  WithPopupMenu.displayName = `withPopupMenu(${componentName})`;

  return WithPopupMenu;
}

export default withPopupMenu;
