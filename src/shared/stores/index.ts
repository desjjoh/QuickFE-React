import { configureStore } from "@reduxjs/toolkit";
import theme from "./theme";

export const store = configureStore({
  reducer: { theme },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
