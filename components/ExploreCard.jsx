'use client';
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import Link from 'next/link';
import { ID_TO_SLUG } from '../constants/industries';

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick, translations, marketInfo, viewMode = 'desktop' }) => {
  const isMobile = viewMode === 'mobile';
  const isTablet = viewMode === 'tablet';
  const isGrid = isMobile || isTablet;
  const isActive = active === id;

  /* ─── MODO GRID: Móvil (2 cols) y Tablet (3 cols) ─── */
  if (isGrid) {
    return (
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className={`relative overflow-hidden rounded-[16px] cursor-pointer group
          ${isMobile ? 'h-[210px]' : 'h-[270px]'}
          ${isActive ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1A232E]' : ''}
        `}
        onClick={() => handleClick(isActive ? null : id)}
      >
        <img
          src={imgUrl}
          alt={translations.explore.industries[id] || title}
          className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />

        {/* Gradient overlay — más alto para proteger legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Estado colapsado: nombre + botón */}
        <AnimatePresence>
          {!isActive && (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3 flex flex-col"
            >
              <h3 className={`font-semibold text-white drop-shadow-lg
                ${isMobile ? 'text-[15px] leading-[1.2]' : 'text-[17px] leading-[1.25]'}`}
              >
                {translations.explore.industries[id]}
              </h3>

              <Link
                href={`/industries/${ID_TO_SLUG[id] || id}`}
                onClick={(e) => e.stopPropagation()}
                className={`mt-2 self-start inline-flex items-center justify-center rounded-full
                  bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium
                  min-h-[36px] active:scale-95 transition-transform shadow-lg
                  ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-1.5 text-sm'}`}
              >
                + Info
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Estado expandido: overlay con info del mercado */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/80 flex flex-col justify-between rounded-[16px]"
            >
              {/* Parte superior: logo + nombre */}
              <div className={`flex items-center gap-2 ${isMobile ? 'p-2.5 pt-3' : 'p-3 pt-4'}`}>
                <div className='flex justify-center items-center w-[26px] h-[26px] rounded-full glassmorphism flex-shrink-0'>
                  <img src='/pp-white.png' alt='PressurePro' className='w-[13px] h-[13px] object-contain' />
                </div>
                <h3 className={`font-bold text-white leading-tight truncate
                  ${isMobile ? 'text-[13px]' : 'text-[15px]'}`}
                >
                  {translations.explore.industries[id]}
                </h3>
              </div>

              {/* Parte central: texto — crece y se recorta si hace falta */}
              <div className={`flex-1 overflow-hidden ${isMobile ? 'px-2.5' : 'px-3'}`}>
                <p className={`text-white/90 leading-[1.4]
                  ${isMobile ? 'text-[11px] line-clamp-5' : 'text-[12.5px] line-clamp-6'}`}
                >
                  {marketInfo && marketInfo[id] ? marketInfo[id] : ''}
                </p>
              </div>

              {/* Parte inferior: botón fijo abajo */}
              <div className={`${isMobile ? 'p-2.5 pb-3' : 'p-3 pb-4'}`}>
                <Link
                  href={`/industries/${ID_TO_SLUG[id] || id}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex items-center justify-center rounded-full
                    bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium
                    min-h-[36px] active:scale-95 transition-transform shadow-lg
                    ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-1.5 text-sm'}`}
                >
                  {translations.explore.showInfo || '+ Info'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  /* ─── MODO DESKTOP: Accordion horizontal ─── */
  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className={`relative my-4 lg:my-8 overflow-hidden rounded-[24px]
        ${isActive ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'}
        h-[450px] lg:h-[550px]
        flex items-center justify-center min-w-[170px]
        transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer hover:opacity-90`}
      onClick={() => handleClick(id)}
    >
      <img
        src={imgUrl}
        alt={translations.explore.industries[id] || title}
        className='absolute w-full h-full object-cover'
      />

      {active !== id ? (
        /* ─ Card colapsada: solo nombre ─ */
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end'>
          <div className='lg:absolute lg:bottom-20 lg:left-1/2 lg:-translate-x-1/2 p-6'>
            <h3 className='font-semibold sm:text-[26px] text-[18px] text-white lg:rotate-[-90deg] lg:origin-[0,0] text-center whitespace-nowrap drop-shadow-lg'>
              {translations.explore.industries[id]}
            </h3>
          </div>
        </div>
      ) : (
        /* ─ Card expandida: info completa ─ */
        <div className='absolute bottom-0 left-0 right-0 max-h-[70%] flex flex-col p-5 lg:p-8 bg-gradient-to-t from-black/90 via-black/70 to-black/30 rounded-b-[24px]'>
          <div className='flex justify-between items-start'>
            <div className='flex justify-center items-center w-[46px] h-[46px] lg:w-[56px] lg:h-[56px] rounded-[20px] glassmorphism flex-shrink-0'>
              <img
                src='/pp-white.png'
                alt='PressurePro'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
            <Link
              href={`/industries/${ID_TO_SLUG[id] || id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm lg:text-base font-semibold shadow-lg min-h-[44px]"
              >
                {translations.explore.showInfo || '+ Info'}
              </motion.span>
            </Link>
          </div>

          <h2 className='mt-3 lg:mt-5 font-bold text-[22px] lg:text-[30px] text-white drop-shadow-md leading-tight'>
            {translations.explore.industries[id]}
          </h2>

          <div className="mt-2 lg:mt-3 flex-1 overflow-hidden">
            <div className="p-3 lg:p-4 rounded-[12px] bg-white/10 backdrop-blur-sm">
              <p className="text-white/95 text-[13px] lg:text-[15px] leading-relaxed line-clamp-3 lg:line-clamp-4">
                {marketInfo && marketInfo[id] ? marketInfo[id] : 'Información no disponible para este mercado.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ExploreCard