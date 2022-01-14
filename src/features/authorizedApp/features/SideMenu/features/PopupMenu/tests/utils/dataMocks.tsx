import React from "react";
import {
  FiAlertCircle,
  FiAnchor,
  FiAperture,
  FiArchive,
  FiBell,
} from "react-icons/fi";

/* Sample menu items */
export const menuItems = [
  {
    icon: <FiAlertCircle />,
    text: "Set an alert",
  },
  {
    icon: <FiAnchor />,
    text: "Bind an item",
  },
  {
    icon: <FiAperture />,
    text: "Take a picture",
  },
  {
    icon: <FiArchive />,
    text: "Move to the archive",
  },
  {
    icon: <FiBell />,
    text: "Create a remainder",
  },
];

/* A component that will serve as a trigger for showing the popup. */
export const TriggerComponent = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref}>Trigger</div>
));
TriggerComponent.displayName = "TriggerComponent";
