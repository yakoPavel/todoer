import styled from "@emotion/styled/macro";
import React from "react";

import { AddNewItemButton } from "../AddNewItemButton/AddNewItemButton";

import { State, StateAction } from "@/features/authorizedApp/features/Page";
import { AddTask as AddTaskForm } from "@/features/authorizedApp/features/Task";

const FormContainer = styled.div`
  padding: 1.75rem;
  width: 100%;
`;

type AddNewTaskProps = {
  dispatchUiState: React.Dispatch<StateAction>;
  projectId: string;
  uiState: State;
};

export const AddNewTask = ({
  dispatchUiState,
  projectId,
  uiState,
}: AddNewTaskProps) => {
  if (uiState.isAddNewTaskMode) {
    return (
      <FormContainer>
        <AddTaskForm
          onCancel={() =>
            dispatchUiState({ type: "ADD_NEW_TASK", payload: false })
          }
          projectId={projectId}
        />
      </FormContainer>
    );
  }

  return (
    <AddNewItemButton
      onClick={() => dispatchUiState({ type: "ADD_NEW_TASK", payload: true })}
    />
  );
};
