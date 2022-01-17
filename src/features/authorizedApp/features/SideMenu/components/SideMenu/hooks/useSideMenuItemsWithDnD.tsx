import { useOnDragEnd } from "features/authorizedApp/features/DragAndDrop";
import React from "react";
import { MdLabel } from "react-icons/md";

import * as Styled from "../styles";
import { usePopups } from "./usePopups";

const dummyProjects = [
  {
    name: "Do my homework",
    tasks: 5,
  },
  {
    name: "Repair the hole",
    tasks: 12,
  },
];

const dummyLabels = [
  {
    name: "test",
    color: "gold",
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
  } = usePopups();

  const projectItems = dummyProjects.map(({ name, tasks }) => ({
    component: (
      <ProjectsMenuLinkWithPopup
        key={name}
        text={name}
        rightSlot={
          <ProjectsClickPopupTrigger>
            <Styled.NumberOfItemsText>{tasks}</Styled.NumberOfItemsText>
          </ProjectsClickPopupTrigger>
        }
      />
    ),
    id: name,
  }));

  const labelItems = dummyLabels.map(({ name, color }) => ({
    component: (
      <LabelsMenuLinkWithPopup
        key={name}
        text={name}
        leftSlot={<MdLabel color={color} />}
        rightSlot={<LabelsClickPopupTrigger />}
      />
    ),
    id: name,
  }));

  const { draggables: projectDraggables, onDragEnd: onProjectDragEnd } =
    useOnDragEnd(projectItems);
  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useOnDragEnd(labelItems);

  return {
    projectDraggables,
    labelDraggables,
    onProjectDragEnd,
    onLabelDragEnd,
  };
}

export { useSideMenuItemsWithDnD };
