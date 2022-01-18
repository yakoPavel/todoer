import { Slide, VisuallyHidden } from "@chakra-ui/react";
import { SIDE_MENU } from "config/localStorage";
import { DragAndDrop } from "features/authorizedApp/features/DragAndDrop";
import { useAppDispatch } from "hooks/storeHooks";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { IoAddOutline } from "react-icons/io5";
import { actions as uiActions } from "store/slices/ui";
import { EventWithProcessedField } from "types";
import * as localStorage from "utils/localStorage";

import { useResize } from "../../hooks/useResize";
import { useSideMenuItemsWithDnD } from "./hooks/useSideMenuItemsWithDnD";
import * as Styled from "./styles";

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

type SideMenuProps = {
  /** Whether or not the side menu is opened. */
  isOpen: boolean;
};
const SideMenu = ({ isOpen }: SideMenuProps) => {
  const {
    projectDraggables,
    labelDraggables,
    favoriteDraggables,
    onProjectDragEnd,
    onLabelDragEnd,
    onFavoritesDragEnd,
  } = useSideMenuItemsWithDnD();

  const { ResizeHandle, resizableElementRef, resizeHandleProps } = useResize({
    maxWidth: 350,
    minWidth: 250,
  });

  const dispatch = useAppDispatch();

  const initialWidth = React.useMemo(
    () => localStorage.getFromLocalStorage(SIDE_MENU.WIDTH, 305),
    [],
  );

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
    <Slide
      direction="left"
      in={isOpen}
      style={{ width: `${initialWidth}px`, top: "var(--header-height, 0)" }}
      ref={resizableElementRef}
    >
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
      <ResizeHandle {...resizeHandleProps} />
    </Slide>
  );
};

export default SideMenu;
