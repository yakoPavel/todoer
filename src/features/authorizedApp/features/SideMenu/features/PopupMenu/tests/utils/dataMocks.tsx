import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

import PopupMenu, { PopupMenuProps } from "../../components/PopupMenu";
import { usePopupMenu } from "../../hooks/usePopupMenu";

/* Sample menu items */
export const menuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add label above" as const,
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add label below" as const,
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit label" as const,
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites" as const,
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete label" as const,
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
