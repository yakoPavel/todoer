import React from "react";

import { actionIds } from "../config/popupMenuActionIds";

import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type PopupActionId = typeof actionIds[keyof typeof actionIds];

export type State = {
  /** An id of the task in the edit mode. */
  taskInEditModeId: string | null;
  /** An id of the task above which the user wants to add a new one. */
  addTaskAboveId: string | null;
  /** An id of the task below which the user wants to add a new one. */
  addTaskBelowId: string | null;
  /** Whether or the 'Add new task' form is visible. */
  isAddNewTaskMode: boolean;
};

type StateActionTypes =
  | "EDIT_MODE_ID"
  | "ADD_TASK_ABOVE_ID"
  | "ADD_TASK_BELOW_ID"
  | "ADD_NEW_TASK";

export type StateAction =
  | { type: Exclude<StateActionTypes, "ADD_NEW_TASK">; payload: string | null }
  | { type: "ADD_NEW_TASK"; payload: boolean };

const initialState: State = {
  taskInEditModeId: null,
  addTaskAboveId: null,
  addTaskBelowId: null,
  isAddNewTaskMode: false,
};

function stateReducer(state: State, action: StateAction): State {
  switch (action.type) {
    case "EDIT_MODE_ID": {
      return {
        ...initialState,
        taskInEditModeId: action.payload,
      };
    }
    case "ADD_TASK_ABOVE_ID": {
      return {
        ...initialState,
        addTaskAboveId: action.payload,
      };
    }
    case "ADD_TASK_BELOW_ID": {
      return {
        ...initialState,
        addTaskBelowId: action.payload,
      };
    }
    case "ADD_NEW_TASK": {
      return {
        ...initialState,
        isAddNewTaskMode: action.payload,
      };
    }
  }
}

function usePopupItemsClickHandler() {
  const [uiState, dispatchUiState] = React.useReducer(
    stateReducer,
    initialState,
  );
  const globalStoreDispatch = useAppDispatch();

  const popupItemsClickHandler = React.useCallback(
    (actionId: string, taskId: string) => {
      switch (actionId as PopupActionId) {
        case actionIds.ADD_TASK_ABOVE: {
          dispatchUiState({ type: "ADD_TASK_ABOVE_ID", payload: taskId });
          break;
        }
        case actionIds.ADD_TASK_BELOW: {
          dispatchUiState({ type: "ADD_TASK_BELOW_ID", payload: taskId });
          break;
        }
        case actionIds.EDIT_TASK: {
          dispatchUiState({ type: "EDIT_MODE_ID", payload: taskId });
          break;
        }
        case actionIds.DELETE_TASK: {
          globalStoreDispatch(
            modalsUiActions.deleteItemDialogAppeared({
              itemId: taskId,
              itemType: "task",
            }),
          );
          break;
        }
        default: {
          throw new Error(`Can't process the unknown actionId: ${actionId}`);
        }
      }
    },
    [globalStoreDispatch],
  );

  return { popupItemsClickHandler, uiState, dispatchUiState };
}

export { usePopupItemsClickHandler };
