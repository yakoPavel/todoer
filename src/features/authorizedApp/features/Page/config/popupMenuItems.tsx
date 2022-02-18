import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

import { actionIds } from "./popupMenuActionIds";

export const taskMenuItemsFull = [
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

export const taskMenuItemsPoor = [
  {
    icon: <AiOutlineDelete />,
    text: "Delete task" as const,
    clickId: actionIds.DELETE_TASK,
  },
];
