import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";

export const locale = "en-US";

void i18n.use(initReactI18next).init({
  resources: {
    [locale]: {
      translation: en,
    },
  },
  lng: locale,
  fallbackLng: locale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
