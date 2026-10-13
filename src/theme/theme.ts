import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

const portal = {
  50: '#f2fce2',
  100: '#eafbc8',
  200: '#d9f79b',
  300: '#bef065',
  400: '#a3e635',
  500: '#84cc16',
  600: '#65a30d',
  700: '#4d7c0f',
  800: '#3f6212',
  900: '#365314',
};

const galactic = {
  50: '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95',
};

const neutrals = {
  white: '#ffffff',
  grey25: '#f8fafc',
  grey400: '#9fa6b4',
  grey600: '#6d778a',
  grey800: '#1e293b',
  grey900: '#111827',
  grey950: '#0f172a',
};

export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
  const isLight = mode === 'light';

  return {
    palette: {
      mode,
      primary: {
        main: isLight ? portal[500] : galactic[400],
        light: isLight ? portal[400] : galactic[300],
        dark: isLight ? portal[600] : galactic[600],
        contrastText: isLight ? neutrals.white : neutrals.grey950,
      },
      secondary: {
        main: isLight ? galactic[500] : portal[400],
      },
      background: {
        default: isLight ? neutrals.grey25 : neutrals.grey950,
        paper: isLight ? neutrals.white : neutrals.grey800,
      },
      text: {
        primary: isLight ? neutrals.grey900 : galactic[50],
        secondary: isLight ? neutrals.grey600 : neutrals.grey400,
      },
    },
    typography: {
      fontFamily: "'Exo 2', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: { fontFamily: "'Creepster', cursive", letterSpacing: '0.05em' },
      h2: { fontFamily: "'Creepster', cursive", letterSpacing: '0.05em' },
      h3: { fontFamily: "'Creepster', cursive", letterSpacing: '0.05em' },
      h4: { fontFamily: "'Creepster', cursive", letterSpacing: '0.05em' },
    },
    components: {
      MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        border: `1px solid ${isLight ? portal[200] : galactic[800]}`,
        boxShadow: isLight
          ? '0 4px 15px -3px rgba(132, 204, 22, 0.2)'
          : '0 0 20px rgba(139, 92, 246, 0.25)',
        
        transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
        
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: isLight
            ? '0 12px 25px -4px rgba(132, 204, 22, 0.4)'
            : '0 0 30px rgba(139, 92, 246, 0.55)',
        },
      },
    },
  },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: PaletteMode) => createTheme(getThemeOptions(mode));