import { NextResponse } from 'next/server';

// Mapeo de códigos de país ISO a nuestros locales
const ISO_TO_LOCALE = {
  'MX': 'mx',
  'AR': 'ar',
  'BR': 'br',
  'PE': 'pe',
  'CL': 'cl',
  'CO': 'co',
  'BO': 'bo',
  'ES': 'es',
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'PT': 'pt',
  'EC': 'mx',
  'VE': 'mx',
  'PY': 'mx',
  'UY': 'mx'
};

// Lista de locales válidos
const VALID_LOCALES = ['es', 'en', 'pt', 'mx', 'ar', 'br', 'pe', 'cl', 'co', 'bo'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // No procesar rutas de API o archivos estáticos
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Obtener el locale actual de la URL
  const currentLocale = request.nextUrl.locale;
  
  // Si ya tiene un locale válido y no es el default, continuar
  if (currentLocale && VALID_LOCALES.includes(currentLocale) && currentLocale !== 'es') {
    return NextResponse.next();
  }

  // Verificar si hay una cookie de preferencia guardada
  const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
    // Si el usuario ya tiene una preferencia guardada, usarla
    if (savedLocale !== currentLocale) {
      const url = request.nextUrl.clone();
      url.locale = savedLocale;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Detectar país desde headers (Vercel, Cloudflare, etc.)
  const countryCode = 
    request.headers.get('x-vercel-ip-country') || 
    request.headers.get('cf-ipcountry') ||
    request.geo?.country;

  if (countryCode && ISO_TO_LOCALE[countryCode]) {
    const detectedLocale = ISO_TO_LOCALE[countryCode];
    
    // Redirigir al locale detectado
    const url = request.nextUrl.clone();
    url.locale = detectedLocale;
    
    const response = NextResponse.redirect(url);
    // Guardar el locale detectado en una cookie
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 año
      path: '/'
    });
    
    return response;
  }

  // Si no se puede detectar, continuar con el locale por defecto (es)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplicar a todas las rutas de páginas
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
