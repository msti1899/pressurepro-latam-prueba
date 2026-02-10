'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';

/**
 * Grid de banderas para seleccionar país
 * Se abre debajo del badge de país en la Navbar
 */
const CountrySlider = ({ isOpen, onClose }) => {
  const { language, country, changeCountry } = useLocale();

  const items = Object.values(COUNTRIES)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => ({
      code: c.code,
      name: c.name,
      flag: c.flag,
    }));

  const activeCode = country || language;

  const handleSelect = (item) => {
    changeCountry(item.code);
    onClose();
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
            className="fixed left-0 right-0 top-[100px] z-[100] flex justify-center px-4"
            style={{ originY: 0 }}
          >
            <div className="bg-[#1A232E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-full max-w-[420px]">
              {/* Título */}
              <div className="px-4 pt-3 pb-1">
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium text-center">
                  {language === 'en' ? 'Select your country' : language === 'pt' ? 'Selecione seu país' : 'Selecciona tu país'}
                </p>
              </div>

              {/* Grid de países centrado */}
              <div className="px-3 pb-3 pt-1">
                <div className="grid grid-cols-3 gap-1.5">
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
                          flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-b from-purple-600/30 to-indigo-600/20 border border-purple-500/40 shadow-lg shadow-purple-500/10' 
                            : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.08] hover:border-white/10'}
                        `}
                      >
                        <img
                          src={item.flag}
                          alt={item.name}
                          className={`w-[30px] h-[20px] object-cover rounded-[2px] shadow-sm ${isActive ? 'ring-1 ring-purple-400/50' : ''}`}
                        />
                        <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-white/50'}`}>
                          {item.name}
                        </span>
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
