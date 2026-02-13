import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '@/utils/motion'
import { LanguageContext } from '../context/LanguageContext';

const InsightsCard = ({ imgUrl, title, description, index, specs, specsUrl }) => {
  const { translations } = useContext(LanguageContext);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Calcular la altura del navbar al montar el componente
  useEffect(() => {
    // Buscamos el elemento navbar
    const navbarElement = document.querySelector('nav');
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }

    // Actualizar en resize
    const handleResize = () => {
      if (navbarElement) {
        setNavbarHeight(navbarElement.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquear el scroll cuando el modal está abierto
  useEffect(() => {
    if (isImageOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isImageOpen]);

  // Restablecer el estado de clic de la flecha
  useEffect(() => {
    if (isArrowClicked) {
      const timer = setTimeout(() => {
        setIsArrowClicked(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isArrowClicked]);

  return (
    <>
      {/* Card principal */}
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.3, 1)}
        className='flex flex-col gap-6 w-full h-full bg-white/5 border border-white/10 rounded-[32px] p-6 hover:border-white/30 transition-colors'
      >
        {/* Imagen con hover effect */}
        <div
          className="relative cursor-pointer w-full h-[250px] sm:h-[300px] rounded-[24px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsImageOpen(true)}
        >
          <Image
            src={imgUrl}
            alt={`Producto TPMS PressurePro ${title} - Sensor de monitoreo de neumáticos`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className='object-cover transition-all duration-300 hover:scale-110 hover:brightness-110'
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Contenido de texto y botón */}
        <div className='flex flex-col justify-between flex-1 gap-6'>
          {/* Texto descriptivo */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-normal md:text-[32px] text-[24px] text-white leading-tight'>
              {title}
            </h3>
            <p className='font-normal text-[16px] text-secondary-white leading-relaxed tracking-wide opacity-90 line-clamp-4'>
              {description}
            </p>
          </div>

          {/* Botón de descarga unificado */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
             <span className="text-sm text-white/60 font-medium">
               {translations.insights?.downloadSpecs || "Especificaciones"}
             </span>
             
             <button
                className={`group flex items-center justify-center w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-white cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white hover:scale-110 ${isArrowClicked ? 'scale-95' : ''
                  }`}
                onMouseEnter={() => setIsArrowHovered(true)}
                onMouseLeave={() => setIsArrowHovered(false)}
                onClick={() => {
                  setIsArrowClicked(true);
                  window.open(specsUrl, '_blank', 'noopener,noreferrer');
                }}
                aria-label={`Descargar especificaciones de ${title}`}
              >
                {/* Ícono de descarga */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[24px] h-[24px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                  animate={{
                    y: isArrowHovered ? 2 : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </motion.svg>
              </button>
          </div>
        </div>
      </motion.div>

      {/* Modal de imagen */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed left-0 right-0 z-[9999] bg-black/90 flex items-center justify-center'
            style={{
              top: `${navbarHeight}px`,
              bottom: 0,
              height: `calc(100vh - ${navbarHeight}px)`
            }}
            onClick={() => setIsImageOpen(false)}
            role="dialog"
            aria-label={`Imagen ampliada de ${title}`}
          >
            {/* Contenedor de la imagen */}
            <div className="w-full max-w-4xl px-4 relative">
              <button 
                onClick={() => setIsImageOpen(false)} 
                className="absolute top-2 right-6 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white min-w-[44px] min-h-[44px]"
                aria-label="Cerrar imagen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-full flex items-center justify-center">
                {/* Imagen */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="relative"
                >
                  <img
                    src={imgUrl}
                    alt='product'
                    className='max-w-full max-h-[calc(100vh-${navbarHeight*2}px)] object-contain rounded-[32px] border-4 border-white'
                    style={{ maxHeight: `calc(100vh - ${navbarHeight * 2}px)` }}
                  />

                  {/* ... resto del código del botón de cierre ... */}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InsightsCard;