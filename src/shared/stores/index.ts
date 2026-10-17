import { configureStore } from "@reduxjs/toolkit";
import theme from "./theme";
import locale from "./locale";

export const store = configureStore({
  reducer: { theme, locale },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
