/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  
  // Trailing slashes consistentes para mejores URLs SEO
  trailingSlash: false,
  
  // Configuración de internacionalización
  i18n: {
    // Idiomas soportados
    locales: ['es', 'en', 'pt', 'mx', 'ar', 'br', 'pe', 'cl', 'co', 'bo', 'uy'],
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
    // Optimización de imágenes para mejor performance
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },

  // Redirecciones para URLs antiguas
  async redirects() {
    return [];
  },
  
  // Configuración de compresión
  compress: true,
  
  // Power by header (deshabilitar para seguridad)
  poweredByHeader: false,
}

module.exports = nextConfig
