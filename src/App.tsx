import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Characters } from './pages/Characters';
import { CharacterDetail } from './pages/CharacterDetail';
import { Search } from './pages/Search';
import { AppBar, Toolbar, Button, Box, Select, MenuItem, CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (event: any) => {
    await i18n.changeLanguage(event.target.value);
  };

  return (
    <FavoritesProvider>
      <BrowserRouter>
      <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/">{t('nav.home')}</Button>
              <Button color="inherit" component={Link} to="/characters">{t('nav.characters')}</Button>
              <Button color="inherit" component={Link} to="/search">{t('nav.search')}</Button>
            </Box>
            
            <Select
              value={i18n.language || 'es'}
              onChange={changeLanguage}
              size="small"
              sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            >
              <MenuItem value="es">ES</MenuItem>
              <MenuItem value="en">EN</MenuItem>
            </Select>
          </Toolbar>
        </AppBar>

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
  );
}

export default App;