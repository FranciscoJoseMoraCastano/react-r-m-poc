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
          },
          list: {
            title: 'Personajes de Rick & Morty'
          },
          search: {
            title: 'Búsqueda Avanzada',
            nameLabel: 'Nombre del personaje',
            namePlaceholder: 'Ej: Rick, Morty...',
            statusLabel: 'Estado',
            allStatuses: 'Todos',
            alive: 'Vivo',
            dead: 'Muerto',
            unknown: 'Desconocido',
            submitButton: 'Buscar',
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
          },
          list: {
            title: 'Rick & Morty Characters'
          },
          search: {
            title: 'Advanced Search',
            nameLabel: 'Character Name',
            namePlaceholder: 'E.g. Rick, Morty...',
            statusLabel: 'Status',
            allStatuses: 'All',
            alive: 'Alive',
            dead: 'Dead',
            unknown: 'Unknown',
            submitButton: 'Search',
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