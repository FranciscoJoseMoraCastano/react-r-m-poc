import { useState, useEffect } from 'react';
import { CharacterApiResponse } from '../types/character';

export const useCharacters = (page: number) => {
  const [data, setData] = useState<CharacterApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los datos de la API');
        return res.json() as Promise<CharacterApiResponse>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [page]);

  return { data, loading, error };
};