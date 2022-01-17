import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

const projectsPopupMenuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add project above" as const,
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add project below" as const,
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit project" as const,
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites" as const,
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete project" as const,
  },
];

const labelsPopupMenuItems = [
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

const filtersPopupMenuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add filter above" as const,
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add filter below" as const,
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit filter" as const,
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites" as const,
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete filter" as const,
  },
];

export { filtersPopupMenuItems, labelsPopupMenuItems, projectsPopupMenuItems };
