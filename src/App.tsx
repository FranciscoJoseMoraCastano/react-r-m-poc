import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Characters } from './pages/Characters';
import { CharacterDetail } from './pages/CharacterDetail';
import { Search } from './pages/Search';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  CssBaseline,
  IconButton,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';
import { FavoritesProvider } from './context/FavoritesContext';
import { CustomThemeProvider, useColorMode } from './context/ThemeContext';
import { supportedLanguages } from './i18n';

const NavigationBar = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggleColorMode } = useColorMode();
  const currentLang = supportedLanguages.some((l) => i18n.language.startsWith(l.code))
  ? i18n.language.slice(0, 2)
  : 'es';

  const changeLanguage = async (event: SelectChangeEvent) => {
    await i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            {t('nav.home')}
          </Button>
          <Button color="inherit" component={Link} to="/characters">
            {t('nav.characters')}
          </Button>
          <Button color="inherit" component={Link} to="/search">
            {t('nav.search')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={toggleColorMode} color="inherit" title="Cambiar tema">
            {mode === 'dark' ? <LightModeIcon sx={{ color: '#a3e635' }} /> : <DarkModeIcon />}
          </IconButton>

          <Select
            value={currentLang}
            onChange={changeLanguage}
            size="small"
            sx={{ minWidth: 75, height: 38 }}
          >
            {supportedLanguages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <CssBaseline />
          <NavigationBar />
          <Box sx={{ padding: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/characters/:id" element={<CharacterDetail />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </FavoritesProvider>
    </CustomThemeProvider>
  );
}

export default App;