import React from "react";

import { LabelsMenuLink } from "../../LabelsMenuLink/LabelsMenuLink";
import { ProjectsMenuLink } from "../../ProjectsMenuLink/ProjectsMenuLink";

import { useEditLabel } from "@/features/authorizedApp/api/editLabel";
import { useEditProject } from "@/features/authorizedApp/api/editProject";
import {
  useOnDragEnd,
  DragAndDropProps,
  DragAndDrop,
} from "@/features/authorizedApp/features/DragAndDrop";
import { Label, Project } from "@/features/authorizedApp/types";

type DraggablesConfig = DragAndDropProps["draggables"];

/**
 * Generates side menu item components and wraps them in an object so that
 * it conforms to the format expected by the `DragAndDrop`.
 *
 * Additionally, accumulates favorite items in an array.
 *
 * @returns An object with labels and projects in the form that conforms
 * to the format expected by the `DragAndDrop` and favorite items (just components).
 */
function generateItems(projectsData: Project[], labelsData: Label[]) {
  const favoriteItems: React.ReactNode[] = [];

  const projectItemsForDnD = projectsData.map(
    ({ name, color, id, isFavorite, taskIds }) => {
      const item = {
        component: (
          <ProjectsMenuLink
            isFavorite={isFavorite}
            name={name}
            numberOfTasks={taskIds.length}
            id={id}
            key={id}
          />
        ),
        id,
      };

      if (isFavorite) favoriteItems.push(item.component);

      return item;
    },
  );

  const labelItemsForDnD = labelsData.map(({ name, color, id, isFavorite }) => {
    const item = {
      component: (
        <LabelsMenuLink
          isFavorite={isFavorite}
          name={name}
          color={color}
          id={id}
          key={id}
        />
      ),
      id,
    };

    if (isFavorite) favoriteItems.push(item.component);

    return item;
  });

  return { projectItemsForDnD, labelItemsForDnD, favoriteItems };
}

function useDndComponents(
  projectsConfig: DraggablesConfig,
  labelConfig: DraggablesConfig,
) {
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
    useOnDragEnd(
      projectsConfig,
      saveDragPositionOnTheBackend.bind(null, "project"),
    );
  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useOnDragEnd(labelConfig, saveDragPositionOnTheBackend.bind(null, "label"));

  return {
    projectItems: (
      <DragAndDrop
        draggables={projectDraggables}
        mainId="projects"
        onDragEnd={onProjectDragEnd}
      />
    ),
    labelItems: (
      <DragAndDrop
        draggables={labelDraggables}
        mainId="labels"
        onDragEnd={onLabelDragEnd}
      />
    ),
  };
}

/**
 * This hook creates side menu items (projects, labels, favorites).
 */
function useSideMenuItems(projectsData: Project[], labelsData: Label[]) {
  const { projectItemsForDnD, labelItemsForDnD, favoriteItems } = React.useMemo(
    () => generateItems(projectsData, labelsData),
    [projectsData, labelsData],
  );

  const { projectItems, labelItems } = useDndComponents(
    projectItemsForDnD,
    labelItemsForDnD,
  );

  return {
    projectItems,
    labelItems,
    favoriteItems,
  };
}

export { useSideMenuItems };
