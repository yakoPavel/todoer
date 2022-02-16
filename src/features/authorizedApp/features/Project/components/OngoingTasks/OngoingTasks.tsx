import styled from "@emotion/styled/macro";
import React from "react";

import { usePopupItemsClickHandler } from "../../hooks/usePopupItemsClickHandler";
import { AddNewTask } from "../AddNewTask/AddNewTask";

import { TaskItemsWithDnD } from "./TaskItemsWithDnD";
import { TaskItemsWithoutDnD } from "./TaskItemsWithoutDnD";

import { Task as TaskData } from "@/features/authorizedApp/types";

const Container = styled.ul`
  width: 100%;
  padding: 0 1.5rem;
`;

type OngoingTasksProps = {
  tasks: TaskData[];
  projectId: string;
};

export const OngoingTasks = ({ tasks, projectId }: OngoingTasksProps) => {
  const { popupItemsClickHandler, uiState, dispatchUiState } =
    usePopupItemsClickHandler();

  const inAdditionOrEditingMode =
    uiState.addTaskAboveId ||
    uiState.addTaskBelowId ||
    uiState.taskInEditModeId;

  return (
    <>
      <Container data-testid="ongoingTasks">
        {inAdditionOrEditingMode ? (
          <TaskItemsWithoutDnD
            dispatchUiState={dispatchUiState}
            popupItemsClickHandler={popupItemsClickHandler}
            projectId={projectId}
            tasks={tasks}
            uiState={uiState}
          />
        ) : (
          <TaskItemsWithDnD
            popupItemsClickHandler={popupItemsClickHandler}
            tasks={tasks}
          />
        )}
      </Container>
      <AddNewTask
        dispatchUiState={dispatchUiState}
        projectId={projectId}
        uiState={uiState}
      />
    </>
  );
};
