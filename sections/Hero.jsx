'use client';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';

const Hero = () => {
  const { translations } = useContext(LanguageContext);
  const { country, language } = useLocale();
  
  // Generar H1 único geo-targeteado por país
  const getGeoTargetedH1 = () => {
    const countryConfig = country ? COUNTRIES[country] : null;
    const terminology = countryConfig?.terminology?.tires || 'Neumáticos';
    
    // H1 optimizado según país
    const h1Map = {
      'cl': `Sistema TPMS para Flotas Comerciales en Chile | Monitoreo de ${terminology}`,
      'pe': `Sistema TPMS para Flotas Comerciales en Perú | Monitoreo de ${terminology}`,
      'mx': `Sistema TPMS para Flotillas Comerciales en México | Monitoreo de ${terminology}`,
      'br': `Sistema TPMS para Frotas Comerciais no Brasil | Monitoramento de ${terminology}`,
      'ar': `Sistema TPMS para Flotas Comerciales en Argentina | Monitoreo de ${terminology}`,
      'co': `Sistema TPMS para Flotas Comerciales en Colombia | Monitoreo de ${terminology}`,
      'uy': `Sistema TPMS para Flotas Comerciales en Uruguay | Monitoreo de ${terminology}`,
      'bo': `Sistema TPMS para Flotas Comerciales en Bolivia | Monitoreo de ${terminology}`,
      'es': `Sistema TPMS para Flotas Comerciales en España | Monitoreo de ${terminology}`,
    };
    
    return country && h1Map[country] 
      ? h1Map[country] 
      : translations.hero.title || 'Monitoreo TPMS de Neumáticos en Tiempo Real';
  };
  
  const dynamicH1 = getGeoTargetedH1();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Configuración del slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/truck.png', '/port-truck.png', '/miner-truck.png'];

  // Autoplay: cambiar la imagen cada 5 segundos, reinicia al hacer click
  const [autoKey, setAutoKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoKey]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
    setAutoKey((k) => k + 1); // reinicia el timer
  };

  // Transformamos el valor del scroll para crear el efecto parallax
  // Aumentamos el rango de movimiento para asegurar cobertura pero ajustamos la posición inicial
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  // También aplicamos el mismo efecto al texto
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id='hero' className="relative w-full h-screen min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image Container - Absolute to Section coverage 100% */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div
          style={{ y: imageY }}
          className="w-full h-[120%] absolute -top-[20px] left-0" // Posicionamiento absoluto y un poco hacia arriba para compensar el parallax inicial
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className='w-full h-full absolute top-0 left-0'
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Sistema TPMS PressurePro - Monitoreo de neumáticos en ${['camiones de transporte', 'operaciones portuarias', 'equipos mineros'][currentImageIndex]} - Sensores de presión en tiempo real`}
                fill
                priority={currentImageIndex === 0}
                quality={85}
                sizes="100vw"
                className='object-cover object-center opacity-90 hover:opacity-100 transition-opacity'
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Gradiente superior suave para mejorar legibilidad del navbar */}
      <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-black/60 to-transparent z-[5] pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='relative z-10 w-full h-full flex flex-col justify-center pt-[95px] pointer-events-none'
      >
        <div className='pointer-events-auto'> {/* Wrapper para contenido interactivo */}
        <motion.div
          ref={ref}
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='w-full flex flex-col justify-center items-center -mt-24 sm:-mt-20'
        >
          {/* Capa de texto que se desplaza junto con la imagen */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col justify-center items-center gap-2 md:gap-1 w-full"
          >
            <motion.div 
              variants={textVariant(1.0)}
              className="relative w-[100px] h-[100px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >
              <Image 
                src="/tpms-icon.png" 
                alt="Icono sistema TPMS PressurePro - Monitoreo de presión de neumáticos"
                width={100}
                height={100}
                priority
                quality={90}
                className="object-contain"
              />
            </motion.div>
            
            <motion.h1
              variants={textVariant(1.1)}
              className='font-bold lg:text-[56px] md:text-[44px] sm:text-[36px] text-[28px] 
              lg:leading-[68px] md:leading-[52px] sm:leading-[44px] leading-[36px] 
              text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] 
              px-6 max-w-[95%] lg:max-w-[1100px] mx-auto'
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {dynamicH1}
            </motion.h1>

            <motion.h2
              variants={textVariant(1.2)}
              className='font-semibold lg:text-[28px] md:text-[22px] sm:text-[18px] text-[16px] 
              lg:leading-[38px] md:leading-[30px] sm:leading-[26px] leading-[24px] 
              text-white/90 text-center px-6 max-w-[90%] lg:max-w-[900px] mx-auto mt-3'
              style={{
                textShadow: '0 1px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'
              }}
            >
              {translations.hero.subtitle}
            </motion.h2>
          </motion.div>
        </motion.div>
        </div> {/* Fin wrapper interactivo */}
      </motion.div>

      {/* Indicadores de slider — fuera del contenedor scrolleable de texto */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-[30] pointer-events-auto">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToSlide(index); }}
            aria-label={`Ir a imagen ${index + 1} de ${images.length}`}
            aria-current={index === currentImageIndex ? 'true' : undefined}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            <span className={`block rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-8 h-3 bg-white shadow-lg'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`} />
          </button>
        ))}
      </div>

      {/* Sello que se mantiene fijo en su posición - bottom absolute */}
      <a href='#mercados' aria-label='Ver industrias' className='absolute bottom-20 right-10 sm:right-20 z-[20] pointer-events-auto'>
          <div className='relative sm:w-[85px] w-[55px] sm:h-[145px] h-[75px]'>
            <Image
              src='/stamp.png'
              alt='Sello certificación PressurePro TPMS - Líder en sistemas de monitoreo'
              fill
              sizes="(max-width: 640px) 55px, 85px"
              className='object-contain'
            />
          </div>
      </a>
    </section>
  )
}

export default Hero