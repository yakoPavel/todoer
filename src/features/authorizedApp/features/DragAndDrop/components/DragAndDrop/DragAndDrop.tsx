import React from "react";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

import { Draggable } from "../Draggable/Draggable";
import { Droppable } from "../Droppable/Droppable";

export type DragAndDropProps = Omit<DragDropContextProps, "children"> & {
  /** An id of the droppable. */
  mainId: string;
  /** Draggable items config. */
  draggables: {
    component: React.ReactNode;
    id: string;
  }[];
};

export const DragAndDrop = ({
  draggables,
  mainId,
  onDragEnd,
  onDragStart,
  ...otherProps
}: DragAndDropProps) => {
  return (
    <DragDropContext
      {...otherProps}
      onDragStart={(initial, provided) => {
        document.documentElement.style.pointerEvents = "none";
        document.documentElement.style.cursor = "move";

        onDragStart?.(initial, provided);
      }}
      onDragEnd={(result, provided) => {
        document.documentElement.style.pointerEvents = "";
        document.documentElement.style.cursor = "";

        onDragEnd(result, provided);
      }}
    >
      <Droppable droppableId={mainId}>
        {draggables.map(({ component, id }, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {component}
          </Draggable>
        ))}
      </Droppable>
    </DragDropContext>
  );
};
