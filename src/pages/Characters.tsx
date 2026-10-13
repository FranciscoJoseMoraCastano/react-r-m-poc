import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Pagination,
  Box,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '../types/character';
import { useFavorites } from '../context/FavoritesContext';
import { getStatusLabel, getSpeciesLabel } from '../utils/characterI18n';

export const Characters = () => {
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useCharacters(page);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (status: string) => {
    if (status === 'Alive') return 'success';
    if (status === 'Dead') return 'error';
    return 'default';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('list.title', 'Personajes de Rick & Morty')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {data?.results.map((char: Character) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={char.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <IconButton
                    aria-label="marcar favorito"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(char);
                    }}
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      zIndex: 10,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    {isFavorite(char.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon color="action" />
                    )}
                  </IconButton>

                  <CardActionArea
                    onClick={() => navigate(`/characters/${char.id}`)}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={char.image}
                      alt={char.name}
                    />
                    <CardContent sx={{ flexGrow: 1, pr: 7 }}>
                      <Typography variant="h6" noWrap>
                        {char.name}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={getStatusLabel(char.status, char.gender, t)}
                          size="small"
                          color={getStatusColor(char.status)}
                        />
                        <Chip
                          label={getSpeciesLabel(char.species, t)}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {data?.info && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
              <Pagination
                count={data.info.pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};