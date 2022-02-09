/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { debounce } from "lodash";

import { RootState } from "../store";

import { SIDE_MENU } from "@/config/localStorage";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

type SideMenuUiState = {
  opened: boolean;
  favoritesSectionOpened: boolean;
  projectsSectionOpened: boolean;
  labelsSectionOpened: boolean;
  width: number;
};

type SectionTypes =
  | "Favorites"
  | "favorites"
  | "Projects"
  | "projects"
  | "Labels"
  | "labels";

const initialState: SideMenuUiState = {
  ...getFromLocalStorage(SIDE_MENU.VISIBILITY, {
    opened: false,
    favoritesSectionOpened: false,
    projectsSectionOpened: false,
    labelsSectionOpened: false,
  }),
  width: getFromLocalStorage(SIDE_MENU.WIDTH, 305),
};

const saveWidthToLocalStorage = debounce((newWidth: number) => {
  saveToLocalStorage(SIDE_MENU.WIDTH, newWidth);
}, 500);

/* Slice */
const sideMenuUiSlice = createSlice({
  name: "sideMenuUi",
  initialState,
  reducers: {
    favoritesSectionOpened(state) {
      state.favoritesSectionOpened = true;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    favoritesSectionClosed(state) {
      state.favoritesSectionOpened = false;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    projectsSectionOpened(state) {
      state.projectsSectionOpened = true;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    projectsSectionClosed(state) {
      state.projectsSectionOpened = false;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    labelsSectionOpened(state) {
      state.labelsSectionOpened = true;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    labelsSectionClosed(state) {
      state.labelsSectionOpened = false;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    opened(state) {
      state.opened = true;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    closed(state) {
      state.opened = false;
      saveToLocalStorage(SIDE_MENU.VISIBILITY, state);
    },
    widthChanged(state, action: PayloadAction<number>) {
      state.width = action.payload;
      saveWidthToLocalStorage(action.payload);
    },
  },
});

/* Public actions */
export const actions = {
  ...sideMenuUiSlice.actions,
  sectionOpened(type: SectionTypes) {
    if (type.toLowerCase() === "favorites") {
      return sideMenuUiSlice.actions.favoritesSectionOpened();
    }
    if (type.toLowerCase() === "labels") {
      return sideMenuUiSlice.actions.labelsSectionOpened();
    }
    return sideMenuUiSlice.actions.projectsSectionOpened();
  },
  sectionClosed(type: SectionTypes) {
    if (type.toLowerCase() === "favorites") {
      return sideMenuUiSlice.actions.favoritesSectionClosed();
    }
    if (type.toLowerCase() === "labels") {
      return sideMenuUiSlice.actions.labelsSectionClosed();
    }
    return sideMenuUiSlice.actions.projectsSectionClosed();
  },
};

/* Selectors */
export const selectors = {
  selectIsOpened: (state: RootState) => state.sideMenuUi.opened,
  selectIsFavoritesOpened: (state: RootState) =>
    state.sideMenuUi.favoritesSectionOpened,
  selectIsProjectsOpened: (state: RootState) =>
    state.sideMenuUi.projectsSectionOpened,
  selectIsLabelsOpened: (state: RootState) =>
    state.sideMenuUi.labelsSectionOpened,
  selectIsSectionOpened: (type: SectionTypes, state: RootState) => {
    if (type.toLowerCase() === "favorites") {
      return state.sideMenuUi.favoritesSectionOpened;
    }
    if (type.toLowerCase() === "labels") {
      return state.sideMenuUi.labelsSectionOpened;
    }
    return state.sideMenuUi.projectsSectionOpened;
  },
  selectWidth: (state: RootState) => state.sideMenuUi.width,
};

export default sideMenuUiSlice.reducer;
