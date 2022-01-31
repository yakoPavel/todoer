import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { LinkProps } from "react-router-dom";

import { actionIds } from "../../config/popupMenuActionIds";
import { MenuLinkWithPopup } from "../MenuLinkWithPopup/MenuLinkWithPopup";

export const NumberOfTasks = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
`;

function getProjectsPopupMenuItems(
  isFavorite: boolean,
  isFavoritesSection: boolean,
) {
  if (isFavoritesSection) {
    return [
      {
        icon: <AiOutlineHeart />,
        text: "Remove from favorites" as const,
        clickId: actionIds.REMOVE_PROJECT_FROM_FAVORITES,
      },
      {
        icon: <AiOutlineEdit />,
        text: "Edit project" as const,
        clickId: actionIds.EDIT_PROJECT,
      },
    ];
  }

  return [
    {
      icon: <BsArrowBarUp />,
      text: "Add project above" as const,
      clickId: actionIds.ADD_PROJECT_ABOVE,
    },
    {
      icon: <BsArrowBarDown />,
      text: "Add project below" as const,
      clickId: actionIds.ADD_PROJECT_BELOW,
    },
    {
      icon: <AiOutlineEdit />,
      text: "Edit project" as const,
      clickId: actionIds.EDIT_PROJECT,
    },
    {
      icon: <AiOutlineHeart />,
      text: (isFavorite ? "Remove from favorites" : "Add to favorites") as
        | "Remove from favorites"
        | "Add to favorites",
      clickId: isFavorite
        ? actionIds.REMOVE_PROJECT_FROM_FAVORITES
        : actionIds.ADD_PROJECT_TO_FAVORITES,
    },
    {
      icon: <AiOutlineDelete />,
      text: "Delete project" as const,
      clickId: actionIds.DELETE_PROJECT,
    },
  ];
}

type ProjectsMenuLinkProps = {
  /**
   * An id of the project. Will be passed as a payload when the user clicks
   * on a popup menu item.
   */
  id: string;
  /** A name of this project. */
  name: string;
  /** A number of tasks in this project. */
  numberOfTasks: number;
  /** A color associated with this project. */
  color: string;
  /** Whether or not this project in the 'favorites' list. */
  isFavorite: boolean;
  /** Whether or not this link will be rendered in the 'favorites' section. */
  isFavoritesSection?: boolean;
} & LinkProps;

export const ProjectsMenuLink = ({
  id,
  name,
  numberOfTasks,
  color,
  isFavorite,
  isFavoritesSection = false,
  ...otherProps
}: ProjectsMenuLinkProps) => {
  const projectsPopupMenuItems = getProjectsPopupMenuItems(
    isFavorite,
    isFavoritesSection,
  );

  return (
    <MenuLinkWithPopup
      id={id}
      text={name}
      leftSlot={<GoPrimitiveDot size="2rem" color={color} />}
      rightSlot={
        numberOfTasks > 0 ? (
          <NumberOfTasks>{numberOfTasks}</NumberOfTasks>
        ) : null
      }
      popupItemsConfig={projectsPopupMenuItems}
      {...otherProps}
    />
  );
};
