import { useOnDragEnd } from "features/authorizedApp/features/DragAndDrop";
import React from "react";

import LabelsMenuLink from "../../LabelsMenuLink/LabelsMenuLink";
import ProjectsMenuLink from "../../ProjectsMenuLink/ProjectsMenuLink";

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
  const projectItems = dummyProjects.map(({ name, tasks }) => ({
    component: (
      <ProjectsMenuLink isFavorite={false} name={name} numberOfTasks={tasks} />
    ),
    id: name,
  }));

  const labelItems = dummyLabels.map(({ name, color }) => ({
    component: <LabelsMenuLink isFavorite={false} name={name} color={color} />,
    id: name,
  }));

  const favoriteItems = dummyFavorites.map((itemConfig) => ({
    component:
      itemConfig.type === "project" ? (
        <ProjectsMenuLink
          isFavorite={false}
          name={itemConfig.name}
          numberOfTasks={itemConfig.tasks}
          isFavoritesSection
        />
      ) : (
        <LabelsMenuLink
          isFavorite={false}
          name={itemConfig.name}
          color={itemConfig.color}
          isFavoritesSection
        />
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
