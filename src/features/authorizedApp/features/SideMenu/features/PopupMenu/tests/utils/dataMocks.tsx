import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

import { PopupMenuProps, PopupMenu } from "../../components/PopupMenu";
import { usePopupMenu } from "../../hooks/usePopupMenu";

/* Sample menu items */
export const menuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add label above" as const,
    clickId: "ADD_LABEL_ABOVE",
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add label below" as const,
    clickId: "ADD_LABEL_BELOW",
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit label" as const,
    clickId: "EDIT_LABEL",
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites" as const,
    clickId: "ADD_TO_FAVORITES",
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete label" as const,
    clickId: "DELETE_LABEL",
  },
];

type ComponentWithPopupProps = {
  showOn: "click" | "contextmenu";
  popupMenuConfig: PopupMenuProps;
};
export const ComponentWithPopup = ({
  showOn,
  popupMenuConfig,
}: ComponentWithPopupProps) => {
  const { isPopupVisible, popupRef, triggerRef } = usePopupMenu(showOn);

  return (
    <>
      <div ref={triggerRef}>Trigger</div>
      {isPopupVisible && <PopupMenu {...popupMenuConfig} ref={popupRef} />}
    </>
  );
};
