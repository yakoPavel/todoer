import React from "react";

import {
  usePopupMenu,
  PopupMenu,
  PopupMenuProps,
} from "@/features/authorizedApp/features/PopupMenu";

type UseTaskPopupOptions = {
  clickHandler: (taskId: string, popupId: string) => void;
  taskId: string;
  menuItemsConfig: PopupMenuProps["menuItems"];
};

export function useTaskPopup({
  clickHandler,
  menuItemsConfig,
  taskId,
}: UseTaskPopupOptions) {
  const {
    isPopupVisible: isContextMenuPopupVisible,
    popupRef: contextMenuPopupRef,
    triggerRef: contextMenuTriggerRef,
  } = usePopupMenu("contextmenu");

  const {
    isPopupVisible: isClickPopupVisible,
    popupRef: clickPopupRef,
    triggerRef: clickTriggerRef,
  } = usePopupMenu("click");

  const Popup = (
    <PopupMenu
      menuItems={menuItemsConfig}
      onClick={clickHandler}
      ref={(element) => {
        contextMenuPopupRef(element);
        clickPopupRef(element);
      }}
      popupId={taskId}
    />
  );

  return {
    isPopupVisible: isContextMenuPopupVisible || isClickPopupVisible,
    Popup,
    contextMenuTriggerRef,
    clickTriggerRef,
  };
}
