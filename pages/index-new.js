import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { detectUserCountry, getRecommendedRoute, getUserPreference } from '../lib/geolocation';

/**
 * Página de entrada que detecta la ubicación del usuario
 * y lo redirige a la versión más apropiada
 */
const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      // Primero verificar si hay preferencia guardada
      const savedPreference = getUserPreference();
      
      if (savedPreference) {
        const path = savedPreference.country 
          ? `/${savedPreference.country}` 
          : `/${savedPreference.language}`;
        router.replace(path);
        return;
      }

      // Si no hay preferencia, detectar ubicación
      try {
        const location = await detectUserCountry();
        
        if (location?.countryCode) {
          const recommended = getRecommendedRoute(location.countryCode);
          router.replace(recommended.path);
        } else {
          // Si falla la detección, ir a español por defecto
          router.replace('/es');
        }
      } catch (error) {
        console.error('Error en detección de ubicación:', error);
        router.replace('/es');
      }
    };

    redirectUser();
  }, [router]);

  return (
    <>
      <Head>
        <title>PressurePro LATAM - Monitoreo de Neumáticos</title>
        <meta name="description" content="Sistema de monitoreo de presión y temperatura de neumáticos en tiempo real para flotas" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      {/* Pantalla de carga mientras se detecta la ubicación */}
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/pp-white.png" 
            alt="PressurePro" 
            className="w-24 h-24 mx-auto mb-6 animate-pulse"
          />
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">Detectando tu ubicación...</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
