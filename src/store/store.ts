import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./slices/ui";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
