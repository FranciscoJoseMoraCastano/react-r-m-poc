import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const localeModules = import.meta.glob<Record<string, unknown>>('./locales/*.json', {
  eager: true,
});

interface LanguageOption {
  code: string;
  label: string;
}

const resources: Record<string, { translation: Record<string, unknown> }> = {};
export const supportedLanguages: LanguageOption[] = [];

for (const filePath in localeModules) {
  const fileName = filePath.split('/').pop()?.replace('.json', '');
  
  if (fileName) {
    const rawModule = localeModules[filePath];
    const jsonContent = rawModule && typeof rawModule === 'object' && 'default' in rawModule 
      ? rawModule.default 
      : rawModule;

    resources[fileName] = {
      translation: jsonContent as Record<string, unknown>,
    };

    supportedLanguages.push({
      code: fileName,
      label: fileName.toUpperCase(),
    });
  }
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;