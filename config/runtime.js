export const DEFAULT_LOCALE = 'es';
export const DEFAULT_BASE_URL = 'https://pressurepro-latam.com';
export const DEFAULT_OG_LOCALE = 'es_LA';
export const DEFAULT_CURRENCY = 'USD';

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL;
}
