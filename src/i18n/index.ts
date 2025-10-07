import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en/translation.json";
import ukTranslation from "../locales/uk/translation.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
  "en-US": {
    translation: enTranslation,
  },
  "uk-UA": {
    translation: ukTranslation,
  },
  "en-UA": {
    translation: ukTranslation,
  },
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en-US",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
