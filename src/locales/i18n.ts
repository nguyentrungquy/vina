import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import viLocale from "./locales/vi/translation.json";
import enLocale from "./locales/en/translation.json";
import cnLocale from "./locales/cn/translation.json";
import krLocale from "./locales/kr/translation.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  vi: {
    translation: viLocale,
  },
  en: {
    translation: enLocale,
  },
  cn: {
    translation: cnLocale,
  },
  kr: {
    translation: krLocale,
  },
  default: viLocale,
};

i18n
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
