import React from "react";

import {
  useOnDoneStatusChange,
  State,
  StateAction,
} from "@/features/authorizedApp/features/Page";
import {
  Task,
  AddTask,
  EditTask,
} from "@/features/authorizedApp/features/Task";
import { Task as TaskData } from "@/features/authorizedApp/types";

type PopupItemsClickHandler = React.ComponentPropsWithRef<
  typeof Task
>["popupClickHandler"];

type TaskItemsWithoutDnDProps = {
  popupItemsClickHandler: PopupItemsClickHandler;
  tasks: TaskData[];
  dispatchUiState: React.Dispatch<StateAction>;
  projectId: string;
  uiState: State;
};

export const TaskItemsWithoutDnD = ({
  dispatchUiState,
  popupItemsClickHandler,
  tasks,
  uiState,
  projectId,
}: TaskItemsWithoutDnDProps) => {
  const onDoneStatusChange = useOnDoneStatusChange();

  return (
    <>
      {tasks.map(({ id, name, description }) => {
        if (uiState.taskInEditModeId === id) {
          return (
            <EditTask
              id={id}
              initialDescription={description}
              initialTitle={name}
              onCancel={() =>
                dispatchUiState({ type: "EDIT_MODE_ID", payload: null })
              }
              key={id}
            />
          );
        }

        return (
          <React.Fragment key={id}>
            {uiState.addTaskAboveId === id && (
              <AddTask
                onCancel={() =>
                  dispatchUiState({ type: "ADD_TASK_ABOVE_ID", payload: null })
                }
                projectId={projectId}
                direction="above"
                triggerId={id}
              />
            )}
            <Task
              id={id}
              isDone={false}
              title={name}
              description={description}
              popupClickHandler={popupItemsClickHandler}
              onDoneStatusChange={onDoneStatusChange.bind(null, id)}
            />
            {uiState.addTaskBelowId === id && (
              <AddTask
                onCancel={() =>
                  dispatchUiState({ type: "ADD_TASK_BELOW_ID", payload: null })
                }
                projectId={projectId}
                direction="below"
                triggerId={id}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
