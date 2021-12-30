import React from "react";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

import Draggable from "../Draggable/Draggable";
import Droppable from "../Droppable/Droppable";

export type DragAndDropProps = Omit<DragDropContextProps, "children"> & {
  /** An id of the droppable. */
  mainId: string;
  /** Draggable items config. */
  draggables: {
    component: React.ReactNode;
    id: string;
  }[];
};

const DragAndDrop = ({
  draggables,
  mainId,
  ...otherProps
}: DragAndDropProps) => {
  return (
    <DragDropContext {...otherProps}>
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

export default DragAndDrop;
