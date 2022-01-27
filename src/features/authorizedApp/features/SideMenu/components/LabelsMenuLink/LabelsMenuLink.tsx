import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import { MdLabel } from "react-icons/md";

import { actionIds } from "../../config/popupMenuActionIds";
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
        clickId: actionIds.REMOVE_LABEL_FROM_FAVORITES,
      },
      {
        icon: <AiOutlineEdit />,
        text: "Edit label" as const,
        clickId: actionIds.EDIT_LABEL,
      },
    ];
  }

  return [
    {
      icon: <BsArrowBarUp />,
      text: "Add label above" as const,
      clickId: actionIds.ADD_LABEL_ABOVE,
    },
    {
      icon: <BsArrowBarDown />,
      text: "Add label below" as const,
      clickId: actionIds.ADD_LABEL_BELOW,
    },
    {
      icon: <AiOutlineEdit />,
      text: "Edit label" as const,
      clickId: actionIds.EDIT_LABEL,
    },
    {
      icon: <AiOutlineHeart />,
      text: (isFavorite ? "Remove from favorites" : "Add to favorites") as
        | "Remove from favorites"
        | "Add to favorites",
      clickId: isFavorite
        ? actionIds.REMOVE_LABEL_FROM_FAVORITES
        : actionIds.ADD_LABEL_TO_FAVORITES,
    },
    {
      icon: <AiOutlineDelete />,
      text: "Delete label" as const,
      clickId: actionIds.DELETE_LABEL,
    },
  ];
}

type LabelsMenuLinkProps = {
  /**
   * An id of the link. Will be passed as a payload when the user clicks
   * on a popup menu item.
   */
  id: string;
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
  id,
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
      id={id}
      text={name}
      leftSlot={<MdLabel color={color} />}
      popupItemsConfig={labelsPopupMenuItems}
    />
  );
};
