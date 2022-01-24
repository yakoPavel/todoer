import { configureStore } from "@reduxjs/toolkit";

import modalsUiSlice from "./slices/modalsUi";

export const store = configureStore({
  reducer: {
    modalsUi: modalsUiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
