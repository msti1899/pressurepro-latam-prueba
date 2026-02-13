'use client';
import React from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import Link from 'next/link';
import Image from 'next/image';
import { ID_TO_SLUG } from '../constants/industries';

const ExploreCard = ({ id, imgUrl, title, index, translations, marketInfo }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.15, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className='relative overflow-hidden rounded-[20px] h-[240px] md:h-[300px] group'
    >
      {/* Imagen de fondo con efecto zoom en hover */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imgUrl}
          alt={translations.explore.industries[id] || title}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-110'
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Overlay con gradiente y efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500 pointer-events-none" />
      
      {/* Brillo superior en hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 pointer-events-none">
        {/* Header con logo */}
        <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='flex justify-center items-center w-[32px] h-[32px] rounded-full glassmorphism'>
            <img src='/pp-white.png' alt='PressurePro' className='w-[16px] h-[16px] object-contain' />
          </div>
        </div>

        {/* Footer con título y botón */}
        <div className="space-y-3">
          <h3 className='font-bold text-[18px] md:text-[22px] text-white leading-tight'>
            {translations.explore.industries[id]}
          </h3>
          
          {/* Descripción corta - visible en hover en desktop */}
          <p className='hidden md:block text-white/0 group-hover:text-white/90 transition-all duration-300 text-[13px] leading-relaxed line-clamp-2 transform translate-y-2 group-hover:translate-y-0'>
            {marketInfo && marketInfo[id] ? marketInfo[id].substring(0, 100) + '...' : ''}
          </p>

          <Link
            href={`/industries/${ID_TO_SLUG[id] || id}`}
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-purple-600 backdrop-blur-sm border border-white/20 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] text-white font-medium text-[14px] transition-all duration-300 min-h-[44px] pointer-events-auto transform hover:-translate-y-1'
          >
            <span>Ver más</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Borde brillante en hover */}
      <div className="absolute inset-0 rounded-[20px] ring-2 ring-purple-500/0 group-hover:ring-purple-500/50 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default ExploreCard