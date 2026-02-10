/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  
  // Configuración de internacionalización
  i18n: {
    // Idiomas soportados
    locales: ['es', 'en', 'pt', 'mx', 'ar', 'br', 'pe', 'cl', 'co', 'bo'],
    // Idioma por defecto
    defaultLocale: 'es',
    // No detectar idioma automáticamente (lo haremos manualmente con geolocalización)
    localeDetection: false,
  },

  // Permitir imágenes externas (banderas CDN)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },

  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://pressurepro-latam.com',
  },

  // Headers de seguridad y SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ],
      },
    ];
  },

  // Redirecciones para URLs antiguas
  async redirects() {
    return [
      // Redirigir /industries a /es con hash
      {
        source: '/industries/:id',
        destination: '/es#explore',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
