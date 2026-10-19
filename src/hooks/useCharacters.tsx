import { useQuery } from '@tanstack/react-query';
import { Character, CharacterApiResponse, MinimalCharacter, CachedApiResponse } from '../types/character';

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
}

const minimizeCharacters = (characters: Character[]): MinimalCharacter[] =>
  characters.map(({ id, name, status, species, gender, image }) => ({
    id,
    name,
    status,
    species,
    gender,
    image,
  }));

const fetchCharacters = async (filters: CharacterFilters, signal?: AbortSignal): Promise<CharacterApiResponse> => {
  const query = new URLSearchParams();
  if (filters.page && filters.page > 1) query.set('page', String(filters.page));
  if (filters.name?.trim()) query.set('name', filters.name.trim());
  if (filters.status && filters.status !== 'all') query.set('status', filters.status);

  const queryString = query.toString();
  const queryContent = queryString ? `?${queryString}` : '';
  const endpoint = `https://rickandmortyapi.com/api/character/${queryContent}`;

  const res = await fetch(endpoint, { signal });
  if (res.status === 404) throw new Error('errors.notFound');
  if (!res.ok) throw new Error('errors.loadCharacter');

  return res.json() as Promise<CharacterApiResponse>;
};

export const useCharacters = (filters: CharacterFilters = {}) => {
  const { page = 1, name = '', status = '' } = filters;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', { page, name, status }],
    queryFn: ({ signal }) => fetchCharacters({ page, name, status }, signal),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    select: (json): CachedApiResponse => ({
      info: json.info,
      results: minimizeCharacters(json.results),
    }),
  });

  const errorHandling = error instanceof Error ? error.message : 'errors.loadCharacter';

  return {
    data: data ?? null,
    loading: isLoading,
    error: isError ? errorHandling : null,
  };
};