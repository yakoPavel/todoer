import { Slide, VisuallyHidden } from "@chakra-ui/react";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { IoAddOutline } from "react-icons/io5";

import { useResize } from "../../hooks/useResize";

import { useSideMenuItemsWithDnD } from "./hooks/useSideMenuItemsWithDnD";
import * as Styled from "./styles";

import { SIDE_MENU } from "@/config/localStorage";
import { useLabels } from "@/features/authorizedApp/api/getLabels";
import { useProjects } from "@/features/authorizedApp/api/getProjects";
import { DragAndDrop } from "@/features/authorizedApp/features/DragAndDrop";
import { Label, Project } from "@/features/authorizedApp/types";
import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";
import { EventWithProcessedField } from "@/types";
import * as localStorage from "@/utils/localStorage";

type AddNewButtonProps = React.ComponentPropsWithRef<"button"> & {
  label: string;
};
const AddNewButton = ({ label, ...otherProps }: AddNewButtonProps) => {
  return (
    <Styled.StyledButton {...otherProps}>
      <IoAddOutline size="2rem" aria-hidden />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Styled.StyledButton>
  );
};

type SideMenuContentProps = {
  labelsData: Label[];
  projectsData: Project[];
};
const SideMenuContent = ({
  labelsData,
  projectsData,
}: SideMenuContentProps) => {
  const {
    projectDraggables,
    labelDraggables,
    favoriteDraggables,
    onProjectDragEnd,
    onLabelDragEnd,
    onFavoritesDragEnd,
  } = useSideMenuItemsWithDnD(projectsData, labelsData);

  const dispatch = useAppDispatch();

  const onAddNew = (
    type: "project" | "label",
    event: EventWithProcessedField<React.MouseEvent>,
  ) => {
    // eslint-disable-next-line no-param-reassign
    event.processed = true;

    if (type === "project") {
      dispatch(uiActions.addProjectFormAppeared());
    } else if (type === "label") {
      dispatch(uiActions.addLabelFormAppeared());
    }
  };

  return (
    <DragDropContext onDragEnd={onProjectDragEnd}>
      <Styled.MenuWrapper id="sideMenu">
        <Styled.StyledMenuSection
          sectionTitle="Favorites"
          sectionContent={
            <DragAndDrop
              mainId="favorites"
              draggables={favoriteDraggables}
              onDragEnd={onFavoritesDragEnd}
            />
          }
        />
        <Styled.StyledMenuSection
          sectionTitle="Projects"
          sectionContent={
            <DragAndDrop
              mainId="projects"
              draggables={projectDraggables}
              onDragEnd={onProjectDragEnd}
            />
          }
          rightSlot={
            <AddNewButton
              label="Add new project"
              onClick={(event) => onAddNew("project", event)}
            />
          }
        />
        <Styled.StyledMenuSection
          sectionTitle="Labels"
          sectionContent={
            <DragAndDrop
              mainId="labels"
              draggables={labelDraggables}
              onDragEnd={onLabelDragEnd}
            />
          }
          rightSlot={
            <AddNewButton
              label="Add new label"
              onClick={(event) => onAddNew("label", event)}
            />
          }
        />
      </Styled.MenuWrapper>
    </DragDropContext>
  );
};

type SideMenuProps = {
  /** Whether or not the side menu is opened. */
  isOpen: boolean;
};
export const SideMenu = ({ isOpen }: SideMenuProps) => {
  const projectsInfo = useProjects();
  const labelsInfo = useLabels();

  const { ResizeHandle, resizableElementRef, resizeHandleProps } = useResize({
    maxWidth: 350,
    minWidth: 250,
  });

  const initialWidth = React.useMemo(
    () => localStorage.getFromLocalStorage(SIDE_MENU.WIDTH, 305),
    [],
  );

  return (
    <Slide
      direction="left"
      in={isOpen}
      style={{ width: `${initialWidth}px`, top: "var(--header-height, 0)" }}
      ref={resizableElementRef}
    >
      {projectsInfo.isSuccess && labelsInfo.isSuccess && (
        <SideMenuContent
          projectsData={projectsInfo.data}
          labelsData={labelsInfo.data}
        />
      )}
      <ResizeHandle {...resizeHandleProps} />
    </Slide>
  );
};
