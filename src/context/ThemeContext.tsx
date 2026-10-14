import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ThemeProvider, PaletteMode } from '@mui/material';
import { createAppTheme } from '../theme/theme';

interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const STORAGE_THEME_KEY = 'rick_morty_poc_theme';

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem(STORAGE_THEME_KEY);
    return savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_KEY, mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('[useColorMode] Must be used within a CustomThemeProvider');
  }
  return context;
};