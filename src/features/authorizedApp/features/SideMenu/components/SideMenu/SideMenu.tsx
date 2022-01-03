import { Slide } from "@chakra-ui/react";
import {
  DragAndDrop,
  useOnDragEnd,
} from "features/authorizedApp/features/DragAndDrop";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { GiWaterDrop } from "react-icons/gi";
import { IoAddOutline } from "react-icons/io5";
import { MdLabel } from "react-icons/md";
import { EventWithProcessedField } from "types";

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

type AddNewButtonProps = React.ComponentPropsWithRef<"button">;
const AddNewButton = (props: AddNewButtonProps) => {
  return (
    <Styled.StyledButton {...props}>
      <IoAddOutline size="2rem" />
    </Styled.StyledButton>
  );
};

function useDragAndDropState() {
  const { draggables: projectDraggables, onDragEnd: onProjectDragEnd } =
    useOnDragEnd(
      getLinksAsDraggables(dummyProjects, {
        rightSlot: ({ tasks }) => (
          <Styled.NumberOfItemsText>{tasks}</Styled.NumberOfItemsText>
        ),
      }),
    );
  const { draggables: labelDraggables, onDragEnd: onLabelDragEnd } =
    useOnDragEnd(
      getLinksAsDraggables(dummyLabels, {
        leftSlot: ({ color }) => <MdLabel color={color} />,
      }),
    );
  const { draggables: filterDraggables, onDragEnd: onFilterDragEnd } =
    useOnDragEnd(
      getLinksAsDraggables(dummyFilters, {
        leftSlot: ({ color }) => <GiWaterDrop color={color} />,
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
      style={{ width: "30.5rem", top: "var(--header-height, 0)" }}
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
              <AddNewButton onClick={(event) => onAddNew("project", event)} />
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
              <AddNewButton onClick={(event) => onAddNew("label", event)} />
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
              <AddNewButton onClick={(event) => onAddNew("filter", event)} />
            }
          />
        </Styled.MenuWrapper>
      </DragDropContext>
    </Slide>
  );
};

export default SideMenu;
