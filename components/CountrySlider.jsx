'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';

/**
 * Slider horizontal de banderas para seleccionar país
 * Se abre debajo del badge de país en la Navbar
 */
const CountrySlider = ({ isOpen, onClose }) => {
  const { language, country, changeCountry } = useLocale();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Todos los items: países hispanohablantes + idiomas (EN, PT)
  const items = [
    // Países (español)
    ...Object.values(COUNTRIES)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({
        code: c.code,
        name: c.name,
        flag: c.flag,
        type: 'country',
      })),
  ];

  // Determinar cuál item está activo
  const activeCode = country || language;

  // Verificar si se puede scrollear
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    if (isOpen) {
      // Esperar a que el DOM se renderice
      setTimeout(() => {
        checkScroll();
        // Scroll al item activo
        const activeEl = scrollRef.current?.querySelector('[data-active="true"]');
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }, 100);
    }
  }, [isOpen, activeCode]);

  const handleSelect = (item) => {
    changeCountry(item.code);
    onClose();
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 200;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay invisible para cerrar al hacer clic fuera */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90]"
            onClick={onClose}
          />

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[100] w-[92vw] max-w-[600px]"
            style={{ originY: 0 }}
          >
            <div className="bg-[#1A232E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Título */}
              <div className="px-4 pt-3 pb-1">
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium">
                  {language === 'en' ? 'Select your country' : language === 'pt' ? 'Selecione seu país' : 'Selecciona tu país'}
                </p>
              </div>

              {/* Contenedor del slide con flechas */}
              <div className="relative px-2 pb-3 pt-1">
                {/* Flecha izquierda */}
                {canScrollLeft && (
                  <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-full flex items-center justify-center bg-gradient-to-r from-[#1A232E] to-transparent"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8 2L4 6L8 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}

                {/* Flecha derecha */}
                {canScrollRight && (
                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-full flex items-center justify-center bg-gradient-to-l from-[#1A232E] to-transparent"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2L8 6L4 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}

                {/* Scroll horizontal */}
                <div
                  ref={scrollRef}
                  onScroll={checkScroll}
                  className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {items.map((item) => {
                    const isActive = item.code === activeCode;
                    return (
                      <motion.button
                        key={item.code}
                        data-active={isActive}
                        onClick={() => handleSelect(item)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-b from-purple-600/30 to-indigo-600/20 border border-purple-500/40 shadow-lg shadow-purple-500/10' 
                            : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.08] hover:border-white/10'}
                        `}
                      >
                        <img
                          src={item.flag}
                          alt={item.name}
                          className={`w-[32px] h-[22px] object-cover rounded-[2px] shadow-sm ${isActive ? 'ring-1 ring-purple-400/50' : ''}`}
                        />
                        <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-white/50'}`}>
                          {item.name}
                        </span>
                        {/* Indicador activo */}
                        {isActive && (
                          <motion.div
                            layoutId="country-indicator"
                            className="w-1 h-1 rounded-full bg-purple-400"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CountrySlider;
