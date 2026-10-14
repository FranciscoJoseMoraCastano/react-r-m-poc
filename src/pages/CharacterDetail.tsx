import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Character } from '../types/character';
import { useFavorites } from '../context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import { getStatusLabel, getSpeciesLabel, getGenderLabel } from '../utils/characterI18n';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 404) {
          throw new Error('errors.notFound');
        }
        if (!res.ok) {
          throw new Error('errors.loadCharacter');
        }
        return res.json() as Promise<Character>;
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;

        console.error(`[CharacterDetail] Failed to fetch character with id ${id}:`, err);

        const errorKey =
          err instanceof Error && err.message.startsWith('errors.')
            ? err.message
            : 'errors.loadCharacter';

        setError(errorKey);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !character) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
        <Alert severity="error">
          {t(error || 'errors.notFound')}
        </Alert>
        <Button sx={{ mt: 2 }} startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          {t('detail.goBackButton')}
        </Button>
      </Box>
    );
  }

  const favoriteActive = isFavorite(character.id);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          {t('detail.goBackButton')}
        </Button>
        <IconButton
          color="error"
          onClick={() => toggleFavorite(character)}
          aria-label="favorito"
          size="large"
        >
          {favoriteActive ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
      </Box>

      <Card sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', sm: 300 } }}
          image={character.image}
          alt={character.name}
        />
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {character.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={getStatusLabel(character.status, character.gender, t)}
              color={character.status === 'Alive' ? 'success' : character.status === 'Dead' ? 'error' : 'default'}
            />
            <Chip label={getSpeciesLabel(character.species, t)} variant="outlined" />
            <Chip label={getGenderLabel(character.gender, t)} variant="outlined" />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>{t('detail.origin')}</strong> {character.origin.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>{t('detail.currentLocation')}</strong> {character.location.name}
          </Typography>
          <Typography variant="body1">
            <strong>{t('detail.episodeAppearances')}</strong> {character.episode.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};