import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          nav: {
            home: 'Inicio',
            characters: 'Personajes',
            search: 'Búsqueda',
          },
          home: {
            title: 'Bienvenido a Rick & Morty Explorer',
          }
        }
      },
      en: {
        translation: {
          nav: {
            home: 'Home',
            characters: 'Characters',
            search: 'Search',
          },
          home: {
            title: 'Welcome to Rick & Morty Explorer',
          }
        }
      },
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;