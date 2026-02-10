# Arquitectura SEO Internacional - PressurePro LATAM

## Resumen de Cambios

Se ha implementado una arquitectura SEO internacional completa con las siguientes características:

### 1. Estructura de URLs

- **Por Idioma:** `/es`, `/en`, `/pt`
- **Por País:** `/mx`, `/ar`, `/br`, `/pe`, `/cl`, `/co`, `/uy`

### 2. Archivos Creados

#### Configuración
- `config/countries.js` - Configuración de países, idiomas y terminología local
- `middleware.js` - Detección automática de país y redirección inteligente
- `next.config.js` - Actualizado con configuración i18n

#### Componentes
- `components/CountryBanner.jsx` - Banner de confirmación de ubicación
- `components/CountryLanguageSelector.jsx` - Selector de país/idioma para navbar
- `components/HreflangTags.jsx` - Generación de etiquetas hreflang
- `components/DynamicSEO.jsx` - Meta tags dinámicos y structured data (JSON-LD)
- `components/WhatsAppButton.jsx` - Botón de WhatsApp con número por país
- `components/RegionalClients.jsx` - Prueba social por país

#### Contexto
- `context/LocaleContext.js` - Nuevo contexto de localización con soporte de país

#### Servicios
- `lib/geolocation.js` - Servicio de geolocalización por IP

#### Traducciones por País
- `locales/mx/translations.js` - México (usa "llantas")
- `locales/co/translations.js` - Colombia (usa "llantas")  
- `locales/ar/translations.js` - Argentina
- `locales/cl/translations.js` - Chile (énfasis minería)
- `locales/pe/translations.js` - Perú (énfasis minería)
- `locales/uy/translations.js` - Uruguay
- `locales/br/translations.js` - Brasil

#### SEO
- `pages/sitemap.xml.js` - Sitemap dinámico con hreflang
- `pages/robots.txt.js` - Robots.txt dinámico

#### Assets
- `public/flags/` - Banderas de países

### 3. Características Implementadas

#### Detección Automática
- Geolocalización por IP usando ipapi.co
- Middleware de redirección basado en headers de Cloudflare/Vercel
- Banner de confirmación para sugerir la versión local

#### SEO Internacional
- Etiquetas hreflang completas
- Canonical URLs por locale
- Sitemap con todas las versiones de idioma/país
- Structured Data (JSON-LD) para Organization y Product
- Meta tags Open Graph y Twitter Card por locale

#### Localización de Contenido
- Terminología adaptada por país:
  - México/Colombia: "Llantas", "Flotilla"
  - Cono Sur: "Neumáticos", "Flota"
- Keywords SEO específicas por país
- Industrias prioritarias por región:
  - Chile/Perú: Minería
  - Argentina/Uruguay: Agro y Transporte
  - México/Colombia: Transporte e Industrial

#### Conversión Directa
- Botón de WhatsApp con número del distribuidor local
- Formularios que pueden vincularse a representantes por país

### 4. Uso

#### Cambiar de País/Idioma
```javascript
import { useLocale } from '../context/LocaleContext';

const { changeCountry, changeLanguage } = useLocale();

// Cambiar a México
changeCountry('mx');

// Cambiar solo idioma (sin país específico)
changeLanguage('en');
```

#### Obtener Terminología Local
```javascript
const { getLocalTerm } = useLocale();

// Retorna "Llantas" en México, "Neumáticos" en Argentina
const tireTerm = getLocalTerm('tires');
```

#### Obtener Keywords SEO
```javascript
const { getSeoKeywords } = useLocale();

const keywords = getSeoKeywords();
// ['TPMS minería Chile', 'monitoreo neumáticos mineros', ...]
```

### 5. Configuración de Producción

1. Actualizar números de WhatsApp en `config/countries.js`
2. Agregar logos de clientes en `public/clients/`
3. Configurar `NEXT_PUBLIC_BASE_URL` en variables de entorno
4. Revisar y personalizar traducciones por país

### 6. Despliegue

El middleware funciona automáticamente en Vercel con la detección de país por IP.
Para otros proveedores, configurar headers de geolocalización (ej: Cloudflare `cf-ipcountry`).
