import React from "react";

import { LabelsMenuLink } from "../../LabelsMenuLink/LabelsMenuLink";
import { ProjectsMenuLink } from "../../ProjectsMenuLink/ProjectsMenuLink";

import { useEditLabel } from "@/features/authorizedApp/api/editLabel";
import { useEditProject } from "@/features/authorizedApp/api/editProject";
import {
  useOnDragEnd,
  DragAndDropProps,
} from "@/features/authorizedApp/features/DragAndDrop";
import { Label, Project } from "@/features/authorizedApp/types";

/**
 * Generates side menu item components and wraps them in an object so that
 * it conforms to the format expected by the `DragAndDrop`.
 */
function generateItemsForDnD(projectsData: Project[], labelsData: Label[]) {
  const favoriteItems: DragAndDropProps["draggables"] = [];

  const projectItems = projectsData.map(
    ({ name, color, id, isFavorite, taskIds }) => {
      const item = {
        component: (
          <ProjectsMenuLink
            isFavorite={isFavorite}
            name={name}
            numberOfTasks={taskIds.length}
            id={id}
          />
        ),
        id,
      };

      if (isFavorite) favoriteItems.push(item);

      return item;
    },
  );

  const labelItems = labelsData.map(({ name, color, id, isFavorite }) => {
    const item = {
      component: (
        <LabelsMenuLink
          isFavorite={isFavorite}
          name={name}
          color={color}
          id={id}
        />
      ),
      id,
    };

    if (isFavorite) favoriteItems.push(item);

    return item;
  });

  return { projectItems, labelItems, favoriteItems };
}

/**
 * This hook creates side menu items and passes them to the DnD establishing
 * mechanism.
 */
function useSideMenuItemsWithDnD(projectsData: Project[], labelsData: Label[]) {
  const editProjectMutation = useEditProject();
  const editLabelMutation = useEditLabel();

  const { projectItems, labelItems, favoriteItems } = React.useMemo(
    () => generateItemsForDnD(projectsData, labelsData),
    [projectsData, labelsData],
  );

  const saveDragPositionOnTheBackend = (
    itemType: "project" | "label" | "favorite",
    itemId: string,
    newItemIndex: number,
  ) => {
    if (itemType === "project") {
      editProjectMutation.mutate({ id: itemId, position: newItemIndex });
    } else if (itemType === "label") {
      editLabelMutation.mutate({ id: itemId, position: newItemIndex });
    }
  };

  const { draggables: projectDraggables, onDragEnd: onProjectDragEnd } =
    useOnDragEnd(
      projectItems,
      saveDragPositionOnTheBackend.bind(null, "project"),
    );
  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useOnDragEnd(labelItems, saveDragPositionOnTheBackend.bind(null, "label"));
  const { draggables: favoriteDraggables, onDragEnd: onFavoritesDragEnd } =
    useOnDragEnd(
      favoriteItems,
      saveDragPositionOnTheBackend.bind(null, "favorite"),
    );

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
