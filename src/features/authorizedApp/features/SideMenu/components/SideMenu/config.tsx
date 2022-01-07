import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

const projectsPopupMenuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add project above",
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add project below",
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit project",
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites",
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete project",
  },
];

const labelsPopupMenuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add label above",
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add label below",
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit label",
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites",
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete label",
  },
];

const filtersPopupMenuItems = [
  {
    icon: <BsArrowBarUp />,
    text: "Add filter above",
  },
  {
    icon: <BsArrowBarDown />,
    text: "Add filter below",
  },
  {
    icon: <AiOutlineEdit />,
    text: "Edit filter",
  },
  {
    icon: <AiOutlineHeart />,
    text: "Add to favorites",
  },
  {
    icon: <AiOutlineDelete />,
    text: "Delete filter",
  },
];

export { filtersPopupMenuItems, labelsPopupMenuItems, projectsPopupMenuItems };
