'use client';
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import NewFeatures from '../components/NewFeatures';
import { LanguageContext } from '../context/LanguageContext';

const WhatsNew = () => {
  const { translations } = useContext(LanguageContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const features = translations.whatsNew.newFeatures;
  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(features.length / itemsPerPage);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play del slider - resetear página al cambiar modo
  useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  // Auto-play del slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const currentFeatures = features.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id='whatsnew' className='sm:px-16 xs:px-8 px-6 py-12 md:py-16 lg:py-24 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-6 lg:gap-8'
      >
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className='flex-[0.95] lg:flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title={`| ${translations.whatsNew.title}`} />
          <TitleText title={translations.whatsNew.title2} as='h2' />
          
          {/* Slider de Features (2 en desktop, 1 en móvil) */}
          <div className='mt-[16px] md:mt-[24px] flex flex-col'>
            
            {/* Contenedor de items con altura mínima responsive */}
            <div className='min-h-[180px] md:min-h-[220px] flex flex-row gap-[12px] md:gap-[20px]'>
              <AnimatePresence mode='wait'>
                {currentFeatures.map((feature, index) => (
                  <motion.div
                    key={`${feature.title}-${currentPage}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-1"
                  >
                    <NewFeatures
                      imgUrl={feature.imgUrl}
                      title={feature.title}
                      subtitle={feature.subtitle}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Paginación / Dots */}
            <div className="flex gap-2 mt-4 md:mt-6 justify-center md:justify-start">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Ver características página ${i + 1}`}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                    currentPage === i ? 'bg-white w-5 md:w-6' : 'bg-white/30 w-1.5 md:w-2 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

          </div>
        </motion.div>
        
        <motion.div
          variants={planetVariants('right')}
          className='flex-1 flex justify-center items-center relative mt-8 lg:mt-0'
        >
          <Image
            src='/whats-new.png'
            alt='Tecnología TPMS PressurePro - Sensores inteligentes de monitoreo de neumáticos en tiempo real'
            width={450}
            height={450}
            loading="lazy"
            quality={85}
            sizes="(max-width: 1024px) 100vw, 450px"
            className='w-full md:w-[90%] h-auto object-contain'
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhatsNew;