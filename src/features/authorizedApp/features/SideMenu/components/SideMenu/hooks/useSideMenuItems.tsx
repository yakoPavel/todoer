import React from "react";

import { LabelsMenuLink } from "../../LabelsMenuLink/LabelsMenuLink";
import { ProjectsMenuLink } from "../../ProjectsMenuLink/ProjectsMenuLink";

import { useEditLabel, useEditProject } from "@/features/authorizedApp/api";
import {
  useDraggablesState,
  DragAndDrop,
} from "@/features/authorizedApp/features/DragAndDrop";
import { Label, Project } from "@/features/authorizedApp/types";

function generateFavoriteItems(projectsData: Project[], labelsData: Label[]) {
  const favoriteItems: React.ReactNode[] = [];

  projectsData.forEach(({ name, color, id, isFavorite, taskIds }) => {
    if (isFavorite)
      favoriteItems.push(
        <ProjectsMenuLink
          isFavorite={isFavorite}
          name={name}
          color={color}
          numberOfTasks={taskIds.length}
          id={id}
          key={id}
          isFavoritesSection={true}
          to={`/projects/${id}`}
        />,
      );
  });

  labelsData.forEach(({ name, color, id, isFavorite }) => {
    if (isFavorite)
      favoriteItems.push(
        <LabelsMenuLink
          isFavorite={isFavorite}
          name={name}
          color={color}
          id={id}
          key={id}
          isFavoritesSection={true}
          to={`/labels/${id}`}
        />,
      );
  });

  return favoriteItems;
}

function useDndComponents(projectsData: Project[], labelsData: Label[]) {
  const editProjectMutation = useEditProject();
  const editLabelMutation = useEditLabel();

  const saveDragPositionOnTheBackend = (
    itemType: "project" | "label",
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
    useDraggablesState({
      data: projectsData,
      componentGenerator: ({ name, color, id, isFavorite, taskIds }) => (
        <ProjectsMenuLink
          isFavorite={isFavorite}
          name={name}
          color={color}
          numberOfTasks={taskIds.length}
          id={id}
          key={id}
          to={`/projects/${id}`}
        />
      ),
      additionalCallback: saveDragPositionOnTheBackend.bind(null, "project"),
    });

  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useDraggablesState({
      data: labelsData,
      componentGenerator: ({ name, color, id, isFavorite }) => (
        <LabelsMenuLink
          isFavorite={isFavorite}
          name={name}
          color={color}
          id={id}
          key={id}
          to={`/labels/${id}`}
        />
      ),
      additionalCallback: saveDragPositionOnTheBackend.bind(null, "label"),
    });

  return {
    projectItems:
      projectDraggables.length > 0 ? (
        <DragAndDrop
          draggables={projectDraggables}
          mainId="projects"
          onDragEnd={onProjectDragEnd}
        />
      ) : null,
    labelItems:
      labelDraggables.length > 0 ? (
        <DragAndDrop
          draggables={labelDraggables}
          mainId="labels"
          onDragEnd={onLabelDragEnd}
        />
      ) : null,
  };
}

/**
 * This hook creates side menu items (projects, labels, favorites).
 */
function useSideMenuItems(projectsData: Project[], labelsData: Label[]) {
  const favoriteItems = generateFavoriteItems(projectsData, labelsData);

  const { projectItems, labelItems } = useDndComponents(
    projectsData,
    labelsData,
  );

  return {
    projectItems,
    labelItems,
    favoriteItems,
  };
}

export { useSideMenuItems };
