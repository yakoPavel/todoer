import { useOnDragEnd } from "features/authorizedApp/features/DragAndDrop";
import React from "react";
import { MdLabel } from "react-icons/md";

import * as Styled from "../styles";
import { usePopups } from "./usePopups";

const dummyProjects = [
  {
    name: "Do my homework",
    tasks: 5,
    type: "project" as const,
  },
  {
    name: "Repair the hole",
    tasks: 12,
    type: "project" as const,
  },
];

const dummyLabels = [
  {
    name: "test",
    color: "gold",
    type: "label" as const,
  },
];

const dummyFavorites = [
  {
    name: "test",
    color: "gold",
    type: "label" as const,
  },
  {
    name: "Repair the hole",
    tasks: 12,
    type: "project" as const,
  },
];

/**
 * This hook creates side menu items and passes them to the DnD establishing
 * mechanism.
 */
function useSideMenuItemsWithDnD() {
  const {
    LabelsMenuLinkWithPopup,
    LabelsClickPopupTrigger,
    ProjectsMenuLinkWithPopup,
    ProjectsClickPopupTrigger,
    FavoritesMenuLinkWithPopup,
    FavoritesClickPopupTrigger,
  } = usePopups();

  const renderProjectLinkItem = (
    name: string,
    tasks: number,
    MenuLinkComponent:
      | typeof ProjectsMenuLinkWithPopup
      | typeof FavoritesMenuLinkWithPopup = ProjectsMenuLinkWithPopup,
    PopupTriggerComponent:
      | typeof ProjectsClickPopupTrigger
      | typeof FavoritesClickPopupTrigger = ProjectsClickPopupTrigger,
  ) => {
    return (
      <MenuLinkComponent
        key={name}
        text={name}
        popupId={name}
        rightSlot={
          <PopupTriggerComponent popupId={name}>
            <Styled.NumberOfItemsText>{tasks}</Styled.NumberOfItemsText>
          </PopupTriggerComponent>
        }
      />
    );
  };

  const renderLabelLinkItem = (
    name: string,
    color: string,
    MenuLinkComponent:
      | typeof LabelsMenuLinkWithPopup
      | typeof FavoritesMenuLinkWithPopup = LabelsMenuLinkWithPopup,
    PopupTriggerComponent:
      | typeof LabelsClickPopupTrigger
      | typeof FavoritesClickPopupTrigger = LabelsClickPopupTrigger,
  ) => {
    return (
      <MenuLinkComponent
        key={name}
        text={name}
        popupId={name}
        leftSlot={<MdLabel color={color} />}
        rightSlot={<PopupTriggerComponent popupId={name} />}
      />
    );
  };

  const projectItems = dummyProjects.map(({ name, tasks }) => ({
    component: renderProjectLinkItem(name, tasks),
    id: name,
  }));

  const labelItems = dummyLabels.map(({ name, color }) => ({
    component: renderLabelLinkItem(name, color),
    id: name,
  }));

  const favoriteItems = dummyFavorites.map((itemConfig) => ({
    component:
      itemConfig.type === "project"
        ? renderProjectLinkItem(
            itemConfig.name,
            itemConfig.tasks,
            FavoritesMenuLinkWithPopup,
            FavoritesClickPopupTrigger,
          )
        : renderLabelLinkItem(
            itemConfig.name,
            itemConfig.color,
            FavoritesMenuLinkWithPopup,
            FavoritesClickPopupTrigger,
          ),
    id: itemConfig.name,
  }));

  const { draggables: projectDraggables, onDragEnd: onProjectDragEnd } =
    useOnDragEnd(projectItems);
  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useOnDragEnd(labelItems);
  const { draggables: favoriteDraggables, onDragEnd: onFavoritesDragEnd } =
    useOnDragEnd(favoriteItems);

  return {
    projectDraggables,
    labelDraggables,
    favoriteDraggables,
    onProjectDragEnd,
    onLabelDragEnd,
    onFavoritesDragEnd,
  };
}

export { useSideMenuItemsWithDnD };
