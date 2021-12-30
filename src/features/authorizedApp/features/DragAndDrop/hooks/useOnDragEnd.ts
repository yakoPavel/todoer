import React from "react";

import { DragAndDropProps } from "../components/DragAndDrop/DragAndDrop";

/**
 * It is a hook that exposes a common implementation of the onDragEnd function
 * for the `DragAndDrop` component. In this implementation, the order of
 * draggable is determined just by the user's actions, i.e. if a user drops
 * a draggable to a new position this position applied.
 *
 * @param initialDraggables - Initial draggables and their ids.
 */
function useOnDragEnd(initialDraggables: DragAndDropProps["draggables"]) {
  const [draggables, setDraggables] = React.useState(initialDraggables);

  const onDragEnd: DragAndDropProps["onDragEnd"] = ({
    source,
    destination,
  }) => {
    if (!destination) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    const newDraggablesState = draggables.slice();
    const [draggedItem] = newDraggablesState.splice(oldIndex, 1);
    newDraggablesState.splice(newIndex, 0, draggedItem);

    setDraggables(newDraggablesState);
  };

  return {
    onDragEnd,
    setDraggables,
    draggables,
  };
}

export { useOnDragEnd };
