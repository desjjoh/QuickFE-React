import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";
import { FALLBACK_LOCALE, LOCALES, resolveInitialLocale } from "./config";

export { LOCALES, FALLBACK_LOCALE, STORAGE_KEY, type AppLocales } from "./config";

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: resolveInitialLocale(),
  fallbackLng: FALLBACK_LOCALE,
  supportedLngs: Object.keys(LOCALES),
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
