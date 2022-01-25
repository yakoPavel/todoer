import { configureStore } from "@reduxjs/toolkit";

import modalsUiSlice from "./slices/modalsUi";
import sideMenuUiSlice from "./slices/sideMenuUi";

export const store = configureStore({
  reducer: {
    modalsUi: modalsUiSlice,
    sideMenuUi: sideMenuUiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
