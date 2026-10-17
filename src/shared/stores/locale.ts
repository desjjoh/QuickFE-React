import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FALLBACK_LOCALE, isAppLocale, type AppLocales } from "../i18n/config";

export type LocaleState = { locale: AppLocales };

const initialState: LocaleState = { locale: FALLBACK_LOCALE };

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<AppLocales>) {
      if (isAppLocale(action.payload)) state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export const selectLocale = (state: { locale: LocaleState }): AppLocales => state.locale.locale;
export default localeSlice.reducer;
