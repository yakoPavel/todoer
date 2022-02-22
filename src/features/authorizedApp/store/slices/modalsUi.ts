/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

type EditFormVisibleState = {
  /** Whether or not the form is visible. */
  visible: true;
  /** An id of the element that triggered visibility of this form. */
  triggerId: string;
};
type EditFormNotVisibleState = {
  /** Whether or not the form is visible. */
  visible: false;
};
type AddNewFormVisibleState = {
  /** Whether or not the form is visible. */
  visible: true;
  /** Where to add a new item relatively to the trigger item. */
  additionDirection?: "below" | "above";
  /** An id of the element that triggered visibility of this form. */
  triggerId?: string;
};
type AddNewFormNotVisibleState = {
  /** Whether or not the form is visible. */
  visible: false;
};
type DeleteItemDialogVisibleState = {
  /** Whether or not the dialog is visible. */
  visible: true;
  /** A type of the item that needs to be removed. */
  itemType: "project" | "label" | "task";
  /** An id of the item that needs to be removed. */
  itemId: string;
};
type DeleteItemDialogNotVisibleState = {
  /** Whether or not the dialog is visible. */
  visible: false;
};
type ThemeSwitcherDialogState = {
  /** Whether or not the dialog is visible. */
  visible: boolean;
};
type LogoutDialog = {
  /** Whether or not the dialog is visible. */
  visible: boolean;
};

type ModalsUiState = {
  addProject: AddNewFormNotVisibleState | AddNewFormVisibleState;
  editProject: EditFormNotVisibleState | EditFormVisibleState;
  addLabel: AddNewFormNotVisibleState | AddNewFormVisibleState;
  editLabel: EditFormNotVisibleState | EditFormVisibleState;
  deleteItem: DeleteItemDialogNotVisibleState | DeleteItemDialogVisibleState;
  themeSwitcher: ThemeSwitcherDialogState;
  logout: LogoutDialog;
};

const initialState: ModalsUiState = {
  addProject: { visible: false },
  editProject: { visible: false },
  addLabel: { visible: false },
  editLabel: { visible: false },
  deleteItem: { visible: false },
  themeSwitcher: { visible: false },
  logout: { visible: false },
};

/* Action payload types */
type AddNewFormAppearedPayload = {
  additionDirection: "below" | "above";
  triggerId: string;
};
type EditFormAppearedPayload = {
  triggerId: string;
};
type DeleteItemDialogAppearedPayload = {
  itemType: DeleteItemDialogVisibleState["itemType"];
  itemId: DeleteItemDialogVisibleState["itemId"];
};

/* Slice */
const modalsUiSlice = createSlice({
  name: "modalsUi",
  initialState,
  reducers: {
    addProjectFormDismissed(state) {
      state.addProject.visible = false;
    },
    addProjectFormAppeared(
      state,
      action: PayloadAction<AddNewFormAppearedPayload | undefined>,
    ) {
      state.addProject = {
        visible: true,
        ...action.payload,
      };
    },

    addLabelFormDismissed(state) {
      state.addLabel.visible = false;
    },
    addLabelFormAppeared(
      state,
      action: PayloadAction<AddNewFormAppearedPayload | undefined>,
    ) {
      state.addLabel = {
        visible: true,
        ...action.payload,
      };
    },

    editProjectFormDismissed(state) {
      state.editProject.visible = false;
    },
    editProjectFormAppeared(
      state,
      action: PayloadAction<EditFormAppearedPayload>,
    ) {
      state.editProject = {
        visible: true,
        ...action.payload,
      };
    },

    editLabelFormDismissed(state) {
      state.editLabel.visible = false;
    },
    editLabelFormAppeared(
      state,
      action: PayloadAction<EditFormAppearedPayload>,
    ) {
      state.editLabel = {
        visible: true,
        ...action.payload,
      };
    },

    deleteItemDialogDismissed(state) {
      state.deleteItem.visible = false;
    },
    deleteItemDialogAppeared(
      state,
      action: PayloadAction<DeleteItemDialogAppearedPayload>,
    ) {
      state.deleteItem = {
        visible: true,
        ...action.payload,
      };
    },

    themeSwitcherDialogDismissed(state) {
      state.themeSwitcher.visible = false;
    },
    themeSwitcherDialogAppeared(state) {
      state.themeSwitcher.visible = true;
    },

    logoutDialogDismissed(state) {
      state.logout.visible = false;
    },
    logoutDialogAppeared(state) {
      state.logout.visible = true;
    },

    reset() {
      return initialState;
    },
  },
});

/* Public actions */
export const { actions } = modalsUiSlice;

/* Selectors */
export const selectors = {
  selectAddProjectFormState: (state: RootState) => state.modalsUi.addProject,
  selectAddLabelFormState: (state: RootState) => state.modalsUi.addLabel,
  selectEditProjectFormState: (state: RootState) => state.modalsUi.editProject,
  selectEditLabelFormState: (state: RootState) => state.modalsUi.editLabel,
  selectDeleteItemDialogState: (state: RootState) => state.modalsUi.deleteItem,
  selectThemeSwitcherDialogState: (state: RootState) =>
    state.modalsUi.themeSwitcher,
  selectLogoutDialogState: (state: RootState) => state.modalsUi.logout,
};

export default modalsUiSlice.reducer;
