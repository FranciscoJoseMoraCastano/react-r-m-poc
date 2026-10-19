import { TFunction } from 'i18next';
import type { ChipProps } from '@mui/material/Chip';

export const getStatusLabel = (status: string, t: TFunction, gender: string = ''): string => {
  const isFemale = gender.toLowerCase() === 'female';
  const context = isFemale ? 'female' : 'male';
  const statusKey = `character.status.${status.toLowerCase()}`;

  return t(statusKey, { context, defaultValue: status });
};

export const getGenderLabel = (gender: string, t: TFunction): string => {
  return t(`character.gender.${gender.toLowerCase()}`, gender);
};

export const getSpeciesLabel = (species: string, t: TFunction): string => {
  const normalizedKey = species.toLowerCase().replace(/\s+/g, '_');
  return t(`character.species.${normalizedKey}`, species);
};

export const getStatusColor = (status: string): ChipProps['color'] => {
  if (status === 'Alive') {
    return 'success';
  }
  
  return status === 'Dead' ? 'error' : 'default';    
}