import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MinimalCharacter } from '../types/character';

interface FavoritesContextType {
  favorites: MinimalCharacter[];
  toggleFavorite: (character: MinimalCharacter) => void;
  isFavorite: (id: number) => boolean;
}

const STORAGE_KEY = 'rick_morty_favs';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<MinimalCharacter[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as MinimalCharacter[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('[FavoritesContext] Failed to persist favorites to localStorage:', error);
    }
  }, [favorites]);

  const toggleFavorite = (character: MinimalCharacter) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === character.id);
      if (exists) {
        return prev.filter((item) => item.id !== character.id);
      }
      return [...prev, character];
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('[useFavorites] Must be used within a FavoritesProvider');
  }
  return context;
};