import React from "react";

import { useEditTask } from "@/features/authorizedApp/api";
import {
  DragAndDrop,
  useDraggablesState,
} from "@/features/authorizedApp/features/DragAndDrop";
import { useOnDoneStatusChange } from "@/features/authorizedApp/features/Page";
import { Task } from "@/features/authorizedApp/features/Task";
import { Task as TaskData } from "@/features/authorizedApp/types";

type PopupItemsClickHandler = React.ComponentPropsWithRef<
  typeof Task
>["popupClickHandler"];

type TaskItemsWithDnDProps = {
  popupItemsClickHandler: PopupItemsClickHandler;
  tasks: TaskData[];
};

export const TaskItemsWithDnD = ({
  popupItemsClickHandler,
  tasks,
}: TaskItemsWithDnDProps) => {
  const editTaskMutation = useEditTask();
  const onDoneStatusChange = useOnDoneStatusChange();

  const saveDragPositionOnTheBackend = (
    itemId: string,
    newItemIndex: number,
  ) => {
    editTaskMutation.mutate({ id: itemId, position: newItemIndex });
  };

  const { draggables, onDragEnd } = useDraggablesState({
    additionalCallback: saveDragPositionOnTheBackend,
    data: tasks,
    componentGenerator: ({ id, name, description }) => (
      <Task
        id={id}
        isDone={false}
        title={name}
        description={description}
        popupClickHandler={popupItemsClickHandler}
        onDoneStatusChange={onDoneStatusChange.bind(null, id)}
      />
    ),
  });

  return (
    <DragAndDrop mainId="tasks" draggables={draggables} onDragEnd={onDragEnd} />
  );
};
