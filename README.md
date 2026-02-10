# PressurePro LATAM - Sistema de Monitoreo de Presión de Neumáticos

Sitio web corporativo para PressurePro LATAM con arquitectura SEO internacional, detección geográfica automática y contenido localizado por país.

## 🚀 Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

## 📦 Requisitos

- **Node.js** 16.x o superior
- **npm** 8.x o superior

## 🌎 Características SEO Internacional

### Países Soportados
| País | URL | Terminología |
|------|-----|--------------|
| México | `/mx` | Llantas |
| Argentina | `/ar` | Neumáticos |
| Chile | `/cl` | Neumáticos |
| Perú | `/pe` | Llantas |
| Colombia | `/co` | Llantas |
| Uruguay | `/uy` | Neumáticos |
| Brasil | `/br` | Pneus |

### Idiomas Base
- Español: `/es`
- Inglés: `/en`
- Portugués: `/pt`

### Funcionalidades
- ✅ **Detección geográfica automática** - Redirige al usuario a su país
- ✅ **Hreflang tags** - SEO optimizado para cada región
- ✅ **Terminología localizada** - "Llantas" vs "Neumáticos" según el país
- ✅ **WhatsApp dinámico** - Número de contacto por país
- ✅ **Middleware de geolocalización** - Funciona en Vercel

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Verificar código
```

## 📁 Estructura del Proyecto

```
├── components/          # Componentes React
│   ├── CountryBanner.jsx    # Banner de detección geográfica
│   ├── WhatsAppButton.jsx   # Botón WhatsApp dinámico
│   ├── HreflangTags.jsx     # Tags SEO hreflang
│   └── DynamicSEO.jsx       # Meta tags dinámicos
├── config/
│   └── countries.js         # Configuración de países
├── context/
│   └── LocaleContext.js     # Contexto de idioma/país
├── lib/
│   └── geolocation.js       # Servicio de geolocalización
├── locales/                 # Traducciones por país
│   ├── es/, en/, pt/        # Idiomas base
│   └── mx/, ar/, cl/...     # Países específicos
├── middleware.js            # Middleware de geolocalización
├── pages/                   # Páginas Next.js
└── sections/                # Secciones de la página
```

## 🚀 Deploy en Vercel

1. Conectar repositorio a Vercel
2. Deploy automático - **No requiere configuración adicional**
3. El middleware detectará automáticamente el país del usuario

## ⚠️ Notas Importantes

- En **localhost**, la detección geográfica usa la API de ipapi.co
- En **Vercel**, usa los headers automáticos de geolocalización
- Los usuarios pueden limpiar preferencias desde la consola:
  ```javascript
  localStorage.clear(); document.cookie.split(";").forEach(c => document.cookie = c.split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
  ```

## 🔧 Built With

- **Next.js 13** - Framework React
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Middleware** - Geolocalización server-side
