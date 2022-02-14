import React from "react";
import isEqual from "react-fast-compare";

import { DragAndDropProps } from "../components/DragAndDrop/DragAndDrop";

type DraggablesData = DragAndDropProps["draggables"];
type WithId = { id: string };

function generateDraggables<Data extends WithId>(
  data: Data[],
  componentGenerator: UseOnDragEndParams<Data>["componentGenerator"],
) {
  return data.map((dataItem) => ({
    component: componentGenerator(dataItem),
    id: dataItem.id,
  }));
}

type UseOnDragEndParams<Data extends WithId> = {
  /** Data that is necessary to generate the components. */
  data: Data[];
  /**
   * A function that should return a component that will be used as a draggable
   * item. Will be invoked for each item in the `data` array with this item as
   * an argument.
   */
  componentGenerator: (data: Data) => React.ReactNode;
  /**
   * A callback that will be called with an item id and a new item index on a
   * drag end.
   */
  additionalCallback?: (itemId: string, newIndex: number) => void;
};

/**
 * It is a hook that maintains the state of the draggable components.
 * Additionally, it exposes a common implementation of the onDragEnd function
 * for the `DragAndDrop` component. In this implementation, the order of
 * draggable is determined just by the user's actions, i.e. if a user drops
 * a draggable to a new position this position applied.
 */
function useDraggablesState<Data extends WithId>({
  componentGenerator: componentsGenerator,
  data,
  additionalCallback,
}: UseOnDragEndParams<Data>) {
  const [draggables, setDraggables] = React.useState<DraggablesData>(() =>
    generateDraggables(data, componentsGenerator),
  );
  const previousDataRef = React.useRef<null | Data[]>(null);

  /* 
    This `useEffect` updates the draggables saved in the state if the data
    passed to this hook are not structurally the same as the data passed
    here on the previous invocation of this hook.

    Why do we need to update draggables in the state if the data get changed? 
    We need to do it because the user can add/delete items at any time. If it 
    happens, the `DragAndDrop` component should be notified about it. When we 
    update the state, we cause a rerender, and the `DragAndDrop` 'sees' the 
    new items.
  */
  React.useEffect(() => {
    const previousData = previousDataRef.current;
    if (previousData !== null && isEqual(previousData, data)) {
      return;
    }

    setDraggables(generateDraggables(data, componentsGenerator));
    previousDataRef.current = data as Data[];
  }, [data, componentsGenerator]);

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

    additionalCallback?.(draggedItem.id, newIndex);
  };

  return {
    onDragEnd,
    setDraggables,
    draggables,
  };
}

export { useDraggablesState };
