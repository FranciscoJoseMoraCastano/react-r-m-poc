import { TFunction } from 'i18next';

export const getStatusLabel = (status: string, gender: string = '', t: TFunction): string => {
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