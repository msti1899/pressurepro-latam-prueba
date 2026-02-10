# 🏳️ Banderas de países

Coloca aquí las imágenes de banderas en formato `.webp`.

## Archivos necesarios

| Archivo      | País/Idioma         |
|-------------|---------------------|
| `mx.webp`   | 🇲🇽 México          |
| `ar.webp`   | 🇦🇷 Argentina       |
| `br.webp`   | 🇧🇷 Brasil          |
| `pe.webp`   | 🇵🇪 Perú            |
| `cl.webp`   | 🇨🇱 Chile           |
| `co.webp`   | 🇨🇴 Colombia        |
| `bo.webp`   | 🇧🇴 Bolivia         |
| `uy.webp`   | 🇺🇾 Uruguay         |
| `es.webp`   | 🇪🇸 España          |
| `us.webp`   | 🇺🇸 English (USA)   |

## Especificaciones recomendadas

- **Formato:** `.webp` (mejor compresión y calidad para web)
- **Tamaño:** 48×32 px (o proporcional, aspect ratio 3:2)
- **Peso máximo:** < 5 KB por archivo
- **Estilo sugerido:** Redondeado (border-radius se aplica por CSS), fondo transparente
- **Nombre:** Todo en minúsculas, usar el código del país como nombre

## Alternativas de formato

Si prefieres otro formato, cambia la extensión en `config/countries.js` y `components/Navbar.jsx`:

- `.webp` ✅ Recomendado (mejor compresión, soporte universal)
- `.png` ✅ Buena opción (transparencia, pero más pesado)
- `.svg` ✅ Escalable (ideal si tienes vectores de calidad)
- `.jpg` ❌ No recomendado (sin transparencia)

## Dónde se usan

- **Navbar** → Selector de idioma
- **CountryLanguageSelector** → Dropdown de países
- **CountryBanner** → Banner de detección de país
- **WhatsAppButton** → Junto al botón de WhatsApp
