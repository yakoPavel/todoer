import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import { MdLabel } from "react-icons/md";

import { MenuLinkWithPopup } from "../MenuLinkWithPopup/MenuLinkWithPopup";

function getLabelsPopupMenuItems(
  isFavorite: boolean,
  isFavoritesSection: boolean,
) {
  if (isFavoritesSection) {
    return [
      {
        icon: <AiOutlineHeart />,
        text: "Remove from favorites" as const,
      },
      {
        icon: <AiOutlineEdit />,
        text: "Edit label" as const,
      },
    ];
  }

  return [
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
      text: (isFavorite ? "Remove from favorites" : "Add to favorites") as
        | "Remove from favorites"
        | "Add to favorites",
    },
    {
      icon: <AiOutlineDelete />,
      text: "Delete label" as const,
    },
  ];
}

type LabelsMenuLinkProps = {
  /** A name of this project. */
  name: string;
  /** A color of the label. */
  color: string;
  /** Whether or not this project in the 'favorites' list. */
  isFavorite: boolean;
  /** Whether or not this link will be rendered in the 'favorites' section. */
  isFavoritesSection?: boolean;
};

export const LabelsMenuLink = ({
  name,
  color,
  isFavorite,
  isFavoritesSection = false,
}: LabelsMenuLinkProps) => {
  const labelsPopupMenuItems = getLabelsPopupMenuItems(
    isFavorite,
    isFavoritesSection,
  );

  return (
    <MenuLinkWithPopup
      type="label"
      text={name}
      leftSlot={<MdLabel color={color} />}
      popupItemsConfig={labelsPopupMenuItems}
    />
  );
};
