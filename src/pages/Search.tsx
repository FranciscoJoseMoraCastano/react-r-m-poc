import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCharacters } from '../hooks/useCharacters';
import { useFavorites } from '../context/FavoritesContext';
import { getStatusLabel, getSpeciesLabel } from '../utils/characterI18n';

interface FormValues {
  name: string;
  status: string;
}

export const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();

  const nameParam = searchParams.get('name') ?? '';
  const statusParam = searchParams.get('status') ?? 'all';
  const pageParam = Number(searchParams.get('page')) || 1;

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: nameParam,
      status: statusParam,
    },
  });

  const { data, loading, error } = useCharacters({
    page: pageParam,
    name: nameParam,
    status: statusParam === 'all' ? '' : statusParam,
  });

  const onSubmit = (formData: FormValues) => {
    const nextParams: Record<string, string> = {};

    if (formData.name.trim()) nextParams.name = formData.name.trim();
    if (formData.status && formData.status !== 'all') nextParams.status = formData.status;

    setSearchParams(nextParams);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      nextParams.set('page', String(newPage));
    } else {
      nextParams.delete('page');
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (status: string) => {
    if (status === 'Alive') return 'success';
    if (status === 'Dead') return 'error';
    return 'default';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('search.title', 'Búsqueda Avanzada')}
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
        >
          <TextField
            {...register('name')}
            label={t('search.nameLabel')}
            placeholder={t('search.namePlaceholder')}
            size="small"
            sx={{ flex: 1, minWidth: 200 }}
          />

          <TextField
            {...register('status')}
            select
            defaultValue={statusParam}
            label={t('search.statusLabel', 'Estado')}
            size="small"
            sx={{ width: 160 }}
          >
            <MenuItem value="all">{t('search.allStatuses')}</MenuItem>
            <MenuItem value="alive">{t('search.alive')}</MenuItem>
            <MenuItem value="dead">{t('search.dead')}</MenuItem>
            <MenuItem value="unknown">{t('search.unknown')}</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
            {t('search.submitButton')}
          </Button>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !loading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {t(error, 'No se han encontrado personajes con esos filtros.')}
        </Alert>
      )}

      {!loading && data && (
        <>
          <Grid container spacing={3}>
            {data.results.map((char) => (
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
                    aria-label="favorito"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(char as Parameters<typeof toggleFavorite>[0]);
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
                          label={getStatusLabel(char.status, t, char.gender)}
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

          {data.info.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
              <Pagination
                count={data.info.pages}
                page={pageParam}
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