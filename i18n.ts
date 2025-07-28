import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define the shape of your translations
interface TranslationResources {
  translation: {
    title: string;
    hello: string;
    language: string;
    english: string;
    french: string;
    [key: string]: string; // For dynamic keys
  };
}

// Strongly typed resources
const resources: Record<string, TranslationResources> = {
  en: {
    translation: {
      title: "Company Name",
      hello: "Hello",
      language: "Language",
      english: "English",
      french: "French"
    }
  },
  fr: {
    translation: {
      title: "Mon Application",
      hello: "Bonjour",
      language: "Langue",
      english: "Anglais",
      french: "Français"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage']
    }
  });

export default i18n;