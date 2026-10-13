import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Character, CharacterApiResponse } from '../types/character';

interface SearchInputs {
  name: string;
  status: string;
}

export const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<SearchInputs>({
    defaultValues: {
      name: '',
      status: '',
    },
  });

  const onSubmit = async (formData: SearchInputs) => {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const params = new URLSearchParams();
      if (formData.name.trim()) params.append('name', formData.name.trim());
      if (formData.status) params.append('status', formData.status);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?${params.toString()}`
      );

      if (response.status === 404) {
        setResults([]);
        return;
      }

      if (!response.ok) {
        throw new Error('Ocurrió un error al consultar la API');
      }

      const data: CharacterApiResponse = await response.json();
      setResults(data.results);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Alive') return 'success';
    if (status === 'Dead') return 'error';
    return 'default';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Búsqueda Avanzada
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            label="Nombre del personaje"
            placeholder="Ej: Rick, Morty, Summer..."
            {...register('name')}
          />

          <TextField
            select
            fullWidth
            label="Estado"
            defaultValue=""
            sx={{ minWidth: { sm: 200 } }}
            {...register('status')}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="alive">Vivo (Alive)</MenuItem>
            <MenuItem value="dead">Muerto (Dead)</MenuItem>
            <MenuItem value="unknown">Desconocido (Unknown)</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            sx={{ height: 56, px: 4, width: { xs: '100%', sm: 'auto' } }}
          >
            Buscar
          </Button>
        </Box>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <Alert severity="info">
          No se encontraron personajes que coincidan con esos criterios de búsqueda.
        </Alert>
      )}

      {!loading && results.length > 0 && (
        <Grid container spacing={3}>
          {results.map((char) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={char.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea onClick={() => navigate(`/characters/${char.id}`)}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={char.image}
                    alt={char.name}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {char.name}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      <Chip
                        label={char.status}
                        size="small"
                        color={getStatusColor(char.status)}
                      />
                      <Chip label={char.species} size="small" variant="outlined" />
                    </Box>
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