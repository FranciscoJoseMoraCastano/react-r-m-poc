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
            subtitle: 'Explora personajes, realiza búsquedas filtradas y guarda tus favoritos localmente.',
            viewCharacters:  'Ver Personajes',
            advancedSearch: 'Búsqueda Avanzada',
            totalFavorites: 'Total Favoritos',
            aliveFavorites: 'Favoritos Vivos',
            unknownFavorites: 'Favoritos Desconocidos',
            deadFavorites: 'Favoritos Muertos',
            myFavorites: 'Tus Personajes Favoritos',
            noFavorites: 'Aún no has guardado ningún personaje en favoritos. Entra al detalle de cualquier personaje y pulsa el corazón para guardarlo.'
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
          },
          detail: {
            goBackButton: 'Volver',
            notFoundMsg: 'Personaje no encontrado',
            origin: 'Origen:',
            currentLocation: 'Ubicación actual:',
            episodeAppearances: 'Apariciones en episodios:',
            episodes: 'episodios'
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
            subtitle: 'Explore characters, perform filtered searches and save your favorites locally.',
            viewCharacters: 'View Characters',
            advancedSearch: 'Advanced Search',
            totalFavorites: 'Total Favorites',
            aliveFavorites: 'Alive Favorites',
            unknownFavorites: 'Unknonwn Favorites',
            deadFavorites: 'Dead Favorites',
            myFavorites: 'Your Favorite Characters',
            noFavorites: "You haven't added any characters to your favorites yet. Visit any character's detail page and tap the heart to save them."
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
          },
          detail: {
            goBackButton: 'Go Back',
            notFoundMsg: 'Character not found',
            origin: 'Origin:',
            currentLocation: 'Current Location:',
            episodeAppearances: 'Episode Appearances:',
            episodes: 'episodes'
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