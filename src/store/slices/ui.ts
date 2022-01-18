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
  additionDirection: "below" | "above" | null;
  /** An id of the element that triggered visibility of this form. */
  triggerId: string | null;
};
type AddNewFormNotVisibleState = {
  /** Whether or not the form is visible. */
  visible: false;
};

type UiState = {
  addProject: AddNewFormNotVisibleState | AddNewFormVisibleState;
  editProject: EditFormNotVisibleState | EditFormVisibleState;
  addLabel: AddNewFormNotVisibleState | AddNewFormVisibleState;
  editLabel: EditFormNotVisibleState | EditFormVisibleState;
  /** Whether or not the side menu is opened. */
  sideMenuOpened: boolean;
};

const initialState: UiState = {
  addProject: { visible: false },
  editProject: { visible: false },
  addLabel: { visible: false },
  editLabel: { visible: false },
  sideMenuOpened: false,
};

/* Action payload types */
type AddNewFormAppearedPayload = {
  additionDirection: "below" | "above";
  triggerId: string;
};
type EditFormAppearedPayload = {
  triggerId: string;
};

/* Slice */
const uiSlice = createSlice({
  name: "ui",
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
        ...(action.payload ?? { additionDirection: null, triggerId: null }),
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
        ...(action.payload ?? { additionDirection: null, triggerId: null }),
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

    sideMenuOpened(state) {
      state.sideMenuOpened = true;
    },
    sideMenuClosed(state) {
      state.sideMenuOpened = false;
    },
  },
});

/* Public actions */
export const { actions } = uiSlice;

/* Selectors */
export const selectors = {
  selectAddProjectFormState: (state: RootState) => state.ui.addProject,
  selectAddLabelFormState: (state: RootState) => state.ui.addLabel,
  selectEditProjectFormState: (state: RootState) => state.ui.editProject,
  selectEditLabelFormState: (state: RootState) => state.ui.editLabel,
  selectIsSideMenuOpened: (state: RootState) => state.ui.sideMenuOpened,
};

export default uiSlice.reducer;
