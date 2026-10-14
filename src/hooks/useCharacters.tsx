import { useState, useEffect } from 'react';
import { Character, CharacterApiResponse, MinimalCharacter, CachedApiResponse } from '../types/character';

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
}

const CACHE_PREFIX = 'rm_cache_';

const minimizeCharacters = (characters: Character[]): MinimalCharacter[] => {
  return characters.map(({ id, name, status, species, gender, image }) => ({
    id,
    name,
    status,
    species,
    gender,
    image,
  }));
};

export const useCharacters = (filters: CharacterFilters = {}) => {
  const { page = 1, name = '', status = '' } = filters;

  const [data, setData] = useState<CachedApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams();
    if (page > 1) query.set('page', String(page));
    if (name.trim()) query.set('name', name.trim());
    if (status && status !== 'all') query.set('status', status);

    const queryString = query.toString();
    const cacheKey = `${CACHE_PREFIX}${queryString || 'default'}`;

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setData(JSON.parse(cached) as CachedApiResponse);
        setLoading(false);
        setError(null);
        return;
      }
    } catch {
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const endpoint = `https://rickandmortyapi.com/api/character/${queryString ? `?${queryString}` : ''}`;

    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (res.status === 404) {
          throw new Error('detail.notFound');
        }
        if (!res.ok) {
          throw new Error('errors.loadCharacter');
        }
        return res.json() as Promise<CharacterApiResponse>;
      })
      .then((json) => {
        const payload: CachedApiResponse = {
          info: json.info,
          results: minimizeCharacters(json.results),
        };

        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(payload));
        } catch {
        }

        setData(payload);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'errors.loadCharacter');
        setData(null);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [page, name, status]);

  return { data, loading, error };
};