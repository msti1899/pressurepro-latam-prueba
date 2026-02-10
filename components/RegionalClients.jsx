'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';

/**
 * Componente que muestra clientes/casos de éxito específicos de la región
 * Genera confianza mostrando logos de empresas locales
 */
const RegionalClients = () => {
  const { country, countryConfig, translations } = useLocale();
  
  // Clientes por país (se pueden agregar más logos)
  const clientsByCountry = {
    mx: [
      { name: 'Cliente México 1', logo: '/clients/mx-client-1.png' },
      { name: 'Cliente México 2', logo: '/clients/mx-client-2.png' },
    ],
    ar: [
      { name: 'Cliente Argentina 1', logo: '/clients/ar-client-1.png' },
    ],
    cl: [
      { name: 'Minera Chile', logo: '/clients/cl-minera.png' },
    ],
    pe: [
      { name: 'Minera Perú', logo: '/clients/pe-minera.png' },
    ],
    br: [
      { name: 'Cliente Brasil 1', logo: '/clients/br-client-1.png' },
    ],
    co: [],
  };

  const clients = country ? clientsByCountry[country] || [] : [];
  
  // Si no hay clientes para mostrar, no renderizar nada
  if (clients.length === 0) {
    return null;
  }

  return (
    <div className="py-8 border-t border-white/10">
      <p className="text-center text-gray-400 text-sm mb-6">
        {translations?.clients?.title || 'Empresas que confían en nosotros'}
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-8">
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RegionalClients;
