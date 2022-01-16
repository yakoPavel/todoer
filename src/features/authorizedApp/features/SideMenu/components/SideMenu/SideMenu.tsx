import { Slide, VisuallyHidden } from "@chakra-ui/react";
import { SIDE_MENU } from "config/localStorage";
import {
  DragAndDrop,
  useOnDragEnd,
} from "features/authorizedApp/features/DragAndDrop";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { IoAddOutline } from "react-icons/io5";
import { MdLabel } from "react-icons/md";
import { EventWithProcessedField } from "types";
import * as localStorage from "utils/localStorage";

import { useResize } from "../../hooks/useResize";
import * as config from "./config";
import * as Styled from "./styles";
import { getLinksAsDraggables } from "./utils";

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

const dummyFilters = [
  {
    name: "Priority1",
    color: "red",
  },
  {
    name: "Assigned to me",
    color: "gold",
  },
];

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

type ComponentWithPopupTriggerProps = {
  PopupTrigger: React.ComponentType;
};
const ComponentWithPopupTrigger: React.FC<ComponentWithPopupTriggerProps> = ({
  PopupTrigger,
  children,
}) => {
  return (
    <Styled.PopupTriggerWrapper>
      {children}
      <PopupTrigger>
        <BsThreeDots />
      </PopupTrigger>
    </Styled.PopupTriggerWrapper>
  );
};

function useDragAndDropState() {
  const onPopupItemClick = (id: string) => {
    console.log(`${id} clicked!`);
  };

  const { draggables: projectDraggables, onDragEnd: onProjectDragEnd } =
    useOnDragEnd(
      getLinksAsDraggables({
        data: dummyProjects,
        popupConfig: {
          menuItems: config.projectsPopupMenuItems,
          onClick: onPopupItemClick,
        },
        slots: {
          rightSlot: ({ tasks }, PopupTrigger) => (
            <ComponentWithPopupTrigger PopupTrigger={PopupTrigger}>
              <Styled.NumberOfItemsText>{tasks}</Styled.NumberOfItemsText>
            </ComponentWithPopupTrigger>
          ),
        },
      }),
    );

  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useOnDragEnd(
      getLinksAsDraggables({
        data: dummyLabels,
        popupConfig: {
          menuItems: config.labelsPopupMenuItems,
          onClick: onPopupItemClick,
        },
        slots: {
          leftSlot: ({ color }) => <MdLabel color={color} />,
          rightSlot: (_, PopupTrigger) => (
            <ComponentWithPopupTrigger PopupTrigger={PopupTrigger} />
          ),
        },
      }),
    );

  const { draggables: filterDraggables, onDragEnd: onFilterDragEnd } =
    useOnDragEnd(
      getLinksAsDraggables({
        data: dummyFilters,
        popupConfig: {
          menuItems: config.filtersPopupMenuItems,
          onClick: onPopupItemClick,
        },
        slots: {
          leftSlot: ({ color }) => <GiWaterDrop color={color} />,
          rightSlot: (_, PopupTrigger) => (
            <ComponentWithPopupTrigger PopupTrigger={PopupTrigger} />
          ),
        },
      }),
    );

  return {
    projectDraggables,
    labelDraggables,
    filterDraggables,
    onProjectDragEnd,
    onLabelDragEnd,
    onFilterDragEnd,
  };
}

type SideMenuProps = {
  /** Whether or not the side menu is opened. */
  isOpen: boolean;
};
const SideMenu = ({ isOpen }: SideMenuProps) => {
  const {
    projectDraggables,
    labelDraggables,
    filterDraggables,
    onProjectDragEnd,
    onLabelDragEnd,
    onFilterDragEnd,
  } = useDragAndDropState();

  const { ResizeHandle, resizableElementRef, resizeHandleProps } = useResize({
    maxWidth: 350,
    minWidth: 250,
  });

  const initialWidth = React.useMemo(
    () => localStorage.getFromLocalStorage(SIDE_MENU.WIDTH, 305),
    [],
  );

  const onAddNew = (
    type: "project" | "label" | "filter",
    event: EventWithProcessedField<React.MouseEvent>,
  ) => {
    // eslint-disable-next-line no-param-reassign
    event.processed = true;
    console.log(`Adding a new ${type}...`);
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
          <Styled.StyledMenuSection
            sectionTitle="Filters"
            sectionContent={
              <DragAndDrop
                mainId="filters"
                draggables={filterDraggables}
                onDragEnd={onFilterDragEnd}
              />
            }
            rightSlot={
              <AddNewButton
                label="Add new filter"
                onClick={(event) => onAddNew("filter", event)}
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
