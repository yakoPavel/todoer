import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

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
      },
      {
        icon: <AiOutlineEdit />,
        text: "Edit project" as const,
      },
    ];
  }

  return [
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
      text: (isFavorite ? "Remove from favorites" : "Add to favorites") as
        | "Remove from favorites"
        | "Add to favorites",
    },
    {
      icon: <AiOutlineDelete />,
      text: "Delete project" as const,
    },
  ];
}

type ProjectsMenuLinkProps = {
  /** A name of this project. */
  name: string;
  /** A number of tasks in this project. */
  numberOfTasks: number;
  /** Whether or not this project in the 'favorites' list. */
  isFavorite: boolean;
  /** Whether or not this link will be rendered in the 'favorites' section. */
  isFavoritesSection?: boolean;
};

export const ProjectsMenuLink = ({
  name,
  numberOfTasks,
  isFavorite,
  isFavoritesSection = false,
}: ProjectsMenuLinkProps) => {
  const projectsPopupMenuItems = getProjectsPopupMenuItems(
    isFavorite,
    isFavoritesSection,
  );

  return (
    <MenuLinkWithPopup
      type="project"
      text={name}
      rightSlot={<NumberOfTasks>{numberOfTasks}</NumberOfTasks>}
      popupItemsConfig={projectsPopupMenuItems}
    />
  );
};
