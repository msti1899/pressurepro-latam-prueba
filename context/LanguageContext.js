// Re-exportar desde LocaleContext para mantener compatibilidad con código existente
// Los componentes que usen LanguageContext seguirán funcionando

export { 
  LocaleContext as LanguageContext, 
  LocaleProvider as LanguageProvider,
  useLocale 
} from './LocaleContext';