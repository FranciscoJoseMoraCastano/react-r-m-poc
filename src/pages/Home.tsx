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
  Chip,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFavorites } from '../context/FavoritesContext';
import { MinimalCharacter } from '../types/character';
import { getStatusLabel, getSpeciesLabel, getStatusColor } from '../utils/characterI18n';

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
        sx={(theme) => ({
          p: { xs: 3, sm: 4 },
          mb: 4,
          background:
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)'
              : 'linear-gradient(135deg, #6d28d9 0%, #1e1b4b 100%)',
          color: 'white',
          borderRadius: 3,
        })}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'center', 
            gap: { xs: 3, md: 5 }
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo de la App"
            sx={{
              width: { xs: 150, sm: 200 },
              height: 'auto',
              borderRadius: '50%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              border: '4px solid rgba(255,255,255,0.2)'
            }}
          />

          <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('home.title')}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              {t('home.subtitle')}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: { xs: 'center', sm: 'flex-start' }, 
                gap: 2, 
                flexWrap: 'wrap' 
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<PeopleIcon />}
                onClick={() => navigate('/characters')}
              >
                {t('home.viewCharacters')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}
                startIcon={<SearchIcon />}
                onClick={() => navigate('/search')}
              >
                {t('home.advancedSearch')}
              </Button>
            </Box>
          </Box>
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
              {t('home.aliveFavorites')}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={2}>
            <HelpOutlinedIcon sx={{ fontSize: 36, mb: 0.5, color: 'text.secondary' }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
              {unknownCount}
            </Typography>
            <Typography color="text.secondary">
              {t('home.unknownFavorites')}
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
              {t('home.deadFavorites')}
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
              {t('home.totalFavorites')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {t('home.myFavorites')}
      </Typography>

      {favorites.length === 0 ? (
        <Alert severity="info">
          {t('home.noFavorites')}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((char: MinimalCharacter) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={char.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => navigate(`/characters/${char.id}`)}>
                  <CardMedia component="img" height="200" image={char.image} alt={char.name} />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {char.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Box sx={{ display: 'flex', gap: 1, mb: 1, mt: 1 }}>
                        <Chip 
                          size="small" 
                          variant="outlined" 
                          label={getSpeciesLabel(char.species, t)} 
                          />
                        <Chip 
                          size="small" 
                          label={getStatusLabel(char.status, t, char.gender)} 
                          color={getStatusColor(char.status)} 
                        />
                      </Box>
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