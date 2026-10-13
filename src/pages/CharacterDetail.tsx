// src/pages/CharacterDetail.tsx
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

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setErrorCode(null);
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Personaje no encontrado');
        return res.json() as Promise<Character>;
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Error al cargar el personaje');
        setLoading(false);
      });
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
      <Box>
        <Alert severity="error">{error ?? 'No se encontró el personaje'}</Alert>
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
              label={character.status}
              color={character.status === 'Alive' ? 'success' : character.status === 'Dead' ? 'error' : 'default'}
            />
            <Chip label={character.species} variant="outlined" />
            <Chip label={character.gender} variant="outlined" />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Origen:</strong> {character.origin.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Ubicación actual:</strong> {character.location.name}
          </Typography>
          <Typography variant="body1">
            <strong>Apariciones en episodios:</strong> {character.episode.length} episodios
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};