# Arquitectura de Localizacion Jerarquica

Esta version centraliza los contenidos variables por idioma y pais en una estructura jerarquica para mantenimiento simple y escalable.

## Fuente unica de verdad

- Idiomas y paises: config/countries.js
- Arbol de traducciones: config/localization/translations.js
- Arbol de contenido de mercado (SEO, hero, paginas): config/localization/marketContent.js
- Contenido largo de paginas por idioma: config/localization/pages/fuelContent.js
- Helpers de resolucion y alternates: config/localization/index.js

## Jerarquia de resolucion

1. Capa global por idioma (es, en, pt)
2. Capa por pais+idioma (ej: mx+es, br+pt, epa+es)
3. Overrides de negocio por pais (config/countryOverrides.js)
4. Fallback seguro a es global

## Cambio clave de locale

Se separo Espana del idioma espanol global:

- Espanol global: es
- Espana (pais): epa

Con esto se elimina la ambiguedad entre idioma y pais.

## Implementacion activa

- LocaleContext ahora usa el arbol jerarquico para translations y marketContent.
- DynamicSEO, FAQ, Partners, Industry y Fuel usan alternates centralizados.
- Fuel consume su contenido multilenguaje desde config/localization/pages/fuelContent.js.
- Hero consume imagenes/alt/href desde marketContent.
- WhatsApp consume numero por pais desde LocaleContext.
- Sitemap incluye la ruta fuel para todos los locales.

## Como agregar un nuevo pais

1. Agregar pais en config/countries.js
2. Agregar traducciones pais en locales/<pais>/translations.js (si aplica)
3. Registrar traducciones en config/localization/translations.js
4. Agregar contenido especifico en config/localization/marketContent.js

## Como personalizar SEO por mercado

Editar config/localization/marketContent.js en:

- global.<idioma>.seo
- countries.<pais>.<idioma>.seo

## Como personalizar Hero por mercado

Editar config/localization/marketContent.js en:

- global.<idioma>.hero.images
- countries.<pais>.<idioma>.hero
