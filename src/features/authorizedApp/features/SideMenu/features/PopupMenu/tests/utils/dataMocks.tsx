import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

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

/* A component that will serve as a trigger for showing the popup. */
export const TriggerComponent = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref}>Trigger</div>
));
TriggerComponent.displayName = "TriggerComponent";
