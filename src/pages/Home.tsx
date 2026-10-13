import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFavorites } from '../context/FavoritesContext';
import { Character } from '../types/character';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const aliveCount = favorites.filter((char) => char.status === 'Alive').length;
  const unknownCount = favorites.filter((char) => char.status === 'unknown').length;
  const deadCount = favorites.filter((char) => char.status === 'Dead').length;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Paper
        sx={{
          p: 4,
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {t('home.title')}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
          {t('home.subtitle', 'Explora personajes, realiza búsquedas filtradas y guarda tus favoritos locales.')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<PeopleIcon />}
            onClick={() => navigate('/characters')}
          >
            {t('home.viewCharacters', 'Ver Personajes')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: 'white', borderColor: 'white' }}
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
          >
            {t('home.advancedSearch', 'Búsqueda Avanzada')}
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={2}>
            <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 36, mb: 0.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              {aliveCount}
            </Typography>
            <Typography color="text.secondary">
              {t('home.aliveFavorites', 'Favoritos Vivos')}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={2}>
            <HelpOutlinedIcon color="action" sx={{ fontSize: 36, mb: 0.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
              {unknownCount}
            </Typography>
            <Typography color="text.secondary">
              {t('home.unknownFavorites', 'Favoritos Desconocidos')}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={2}>
            <HighlightOffIcon color="error" sx={{ fontSize: 36, mb: 0.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
              {deadCount}
            </Typography>
            <Typography color="text.secondary">
              {t('home.deadFavorites', 'Favoritos Muertos')}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={2}>
            <FavoriteIcon color="error" sx={{ fontSize: 36, mb: 0.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {favorites.length}
            </Typography>
            <Typography color="text.secondary">
              {t('home.totalFavorites', 'Total Favoritos')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {t('home.myFavorites', 'Tus Personajes Favoritos')}
      </Typography>

      {favorites.length === 0 ? (
        <Alert severity="info">
          {t('home.noFavorites', 'Aún no has guardado ningún personaje en favoritos. Entra al detalle de cualquier personaje y pulsa el corazón para guardarlo.')}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((char: Character) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={char.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => navigate(`/characters/${char.id}`)}>
                  <CardMedia component="img" height="200" image={char.image} alt={char.name} />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {char.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {char.species} • {char.status}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};