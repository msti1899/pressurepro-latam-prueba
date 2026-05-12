'use client';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';
import { LanguageContext } from '../context/LanguageContext';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';
import ContactModal from '../components/ContactModal';

const Hero = () => {
  const { translations } = useContext(LanguageContext);
  const { country, language, marketContent } = useLocale();
  const [modalType, setModalType] = useState(null);

  const getGeoTargetedH1 = () => {
    const countryConfig = country ? COUNTRIES[country] : null;
    const terminology = countryConfig?.terminology?.tires || translations?.hero?.defaultTireTerm;

    const h1Map = {
      cl: `Sistema TPMS para Flotas Comerciales en Chile | Monitoreo de ${terminology}`,
      pe: `Sistema TPMS para Flotas Comerciales en Perú | Monitoreo de ${terminology}`,
      mx: `Sistema TPMS para Flotillas Comerciales en México | Monitoreo de ${terminology}`,
      br: `Sistema TPMS para Frotas Comerciais no Brasil | Monitoramento de ${terminology}`,
      ar: `Sistema TPMS para Flotas Comerciales en Argentina | Monitoreo de ${terminology}`,
      co: `Sistema TPMS para Flotas Comerciales en Colombia | Monitoreo de ${terminology}`,
      uy: `Sistema TPMS para Flotas Comerciales en Uruguay | Monitoreo de ${terminology}`,
      bo: `Sistema TPMS para Flotas Comerciales en Bolivia | Monitoreo de ${terminology}`,
      epa: `Sistema TPMS para Flotas Comerciales en España | Monitoreo de ${terminology}`,
    };

    return country && countryConfig?.language === language && h1Map[country]
      ? h1Map[country]
      : translations?.hero?.title;
  };

  const heroImages = marketContent?.hero?.images || [];

  const dynamicH1 = getGeoTargetedH1();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoKey, setAutoKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [autoKey, heroImages.length]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
    setAutoKey((k) => k + 1);
  };

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id='hero' className="relative w-full h-screen min-h-screen flex flex-col justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }}
      >
        <motion.div
          style={{ y: imageY }}
          className="w-full h-[120%] absolute -top-[20px] left-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={currentImageIndex === 0 ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className='w-full h-full absolute top-0 left-0'
            >
              <Image
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt?.[language] || heroImages[currentImageIndex].alt?.es}
                fill
                priority={currentImageIndex === 0}
                quality={75}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                className='object-cover object-center opacity-90 hover:opacity-100 transition-opacity'
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-black/60 to-transparent z-[5] pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25,
        }}
        className='relative z-10 w-full h-full flex flex-col justify-center pt-[95px] pointer-events-none'
      >
        <div className='pointer-events-auto'>
          <motion.div
            ref={ref}
            variants={slideIn('right', 'tween', 0.2, 1)}
            className='w-full flex flex-col justify-center items-center -mt-24 sm:-mt-20'
          >
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
                  alt={translations?.hero?.tpmsIconAlt}
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
                  textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)',
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
                  textShadow: '0 1px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
                }}
              >
                {translations.hero.subtitle}
              </motion.h2>

              {/* CTAs principales */}
              <motion.div
                variants={textVariant(1.35)}
                className='flex flex-wrap gap-3 justify-center mt-8'
              >
                <button
                  onClick={() => setModalType('quote')}
                  className='px-6 py-3 rounded-full bg-purple-500 text-white font-semibold text-sm md:text-base shadow-lg shadow-purple-500/30 hover:bg-purple-600 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2'
                >
                  <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  {translations?.cta?.quoteButton || 'Solicitar Cotización'}
                </button>
                <button
                  onClick={() => setModalType('demo')}
                  className='px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm md:text-base hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2'
                >
                  <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  {translations?.cta?.demoButton || 'Demo Gratuita'}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-[30] pointer-events-auto">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToSlide(index);
            }}
            aria-label={`Ir a imagen ${index + 1} de ${heroImages.length}`}
            aria-current={index === currentImageIndex ? 'true' : undefined}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${index === currentImageIndex
                ? 'w-8 h-3 bg-white shadow-lg'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                }`}
            />
          </button>
        ))}
      </div>

      <a href={marketContent?.hero?.stampHref} aria-label={translations?.hero?.stampAriaLabel} className='absolute bottom-20 right-10 sm:right-20 z-[20] pointer-events-auto'>
        <div className='relative sm:w-[85px] w-[55px] sm:h-[145px] h-[75px]'>
          <Image
            src='/stamp.png'
            alt={translations?.hero?.stampAlt}
            fill
            sizes="(max-width: 640px) 55px, 85px"
            className='object-contain'
          />
        </div>
      </a>

      <ContactModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'contact'} />
    </section>
  );
};

export default Hero;