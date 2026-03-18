import { COUNTRIES, LANGUAGES, getDefaultCountryForLanguage } from '../countries';
import { TRANSLATIONS_TREE } from './translations';
import { MARKET_CONTENT_TREE } from './marketContent';

export const DEFAULT_LANGUAGE = 'es';

export function resolveLocaleState(locale) {
  if (!locale) {
    return { language: DEFAULT_LANGUAGE, country: null };
  }

  if (COUNTRIES[locale]) {
    return {
      language: COUNTRIES[locale].language,
      country: locale,
    };
  }

  if (LANGUAGES[locale]) {
    return {
      language: locale,
      country: null,
    };
  }

  return { language: DEFAULT_LANGUAGE, country: null };
}

export function getTranslationsForMarket(language, country) {
  const globalTranslations = TRANSLATIONS_TREE.global[language] || TRANSLATIONS_TREE.global[DEFAULT_LANGUAGE];

  if (!country) {
    return clone(globalTranslations);
  }

  // Solo aplicar traducciones específicas del país cuando existen para el idioma solicitado.
  const countryTranslations = TRANSLATIONS_TREE.countries[country]?.[language];

  if (!countryTranslations) {
    return clone(globalTranslations);
  }

  return deepMerge(clone(globalTranslations), clone(countryTranslations));
}

export function getMarketContentForLocale(language, country) {
  const globalContent = MARKET_CONTENT_TREE.global[language] || MARKET_CONTENT_TREE.global[DEFAULT_LANGUAGE] || {};

  if (!country) {
    return clone(globalContent);
  }

  // Solo aplicar contenido específico del país cuando existe para el idioma solicitado.
  const countryContent = MARKET_CONTENT_TREE.countries[country]?.[language] || {};

  return deepMerge(clone(globalContent), clone(countryContent));
}

export function buildAlternates(baseUrl, pagePath = '') {
  const cleanPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
  const pathSuffix = cleanPath === '/' ? '' : cleanPath;
  const defaultCountry = getDefaultCountryForLanguage(DEFAULT_LANGUAGE) || 'mx';

  const alternates = [];

  Object.keys(COUNTRIES).forEach((countryCode) => {
    alternates.push({
      hreflang: COUNTRIES[countryCode].hreflang,
      href: `${baseUrl}/${countryCode}${pathSuffix}`,
    });
  });

  alternates.push({
    hreflang: 'x-default',
    href: `${baseUrl}/${defaultCountry}${pathSuffix}`,
  });

  return alternates;
}

export function shouldNoIndexAlternateLanguage(language, country) {
  if (!country || !COUNTRIES[country]) {
    return false;
  }

  return language !== COUNTRIES[country].language;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object') {
    return target;
  }

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      target[key] = deepMerge(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}
