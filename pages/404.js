import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-black text-white p-4 text-center">
        <div className="relative w-[150px] h-[150px] mb-6">
            <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <img src="/pressurepro-latam-logo.png" alt="Logo" className="relative z-10 w-full h-full object-contain" />
        </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-6">Página no encontrada</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      
      <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-8 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1">
        <span>Volver al Inicio</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>
    </div>
  );
}
