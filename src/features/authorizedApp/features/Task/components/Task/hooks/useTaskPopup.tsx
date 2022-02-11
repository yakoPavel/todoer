import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

import { actionIds } from "../config/popupMenuActionIds";

import {
  usePopupMenu,
  PopupMenu,
} from "@/features/authorizedApp/features/PopupMenu";

const ongoingTaskMenuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add task above" as const,
    clickId: actionIds.ADD_TASK_ABOVE,
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add task below" as const,
    clickId: actionIds.ADD_TASK_BELOW,
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit task" as const,
    clickId: actionIds.EDIT_TASK,
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete task" as const,
    clickId: actionIds.DELETE_TASK,
  },
];

const finishedTaskMenuItems = [
  {
    icon: <AiOutlineDelete />,
    text: "Delete task" as const,
    clickId: actionIds.DELETE_TASK,
  },
];

type UseTaskPopupOptions = {
  clickHandler: (taskId: string) => void;
  isTaskDone: boolean;
  taskId: string;
};

export function useTaskPopup({
  clickHandler,
  isTaskDone,
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

  const menuItems = isTaskDone ? finishedTaskMenuItems : ongoingTaskMenuItems;

  const Popup = (
    <PopupMenu
      menuItems={menuItems}
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
