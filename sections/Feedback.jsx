'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
import { LanguageContext } from '../context/LanguageContext';
import { TitleText, TypingText } from '../components/CustomTexts';
import ContactModal from '../components/ContactModal';

const Feedback = () => {
  const { translations } = useContext(LanguageContext);
  const fb = translations?.feedback || {};
  const [showModal, setShowModal] = useState(false);

  return (
    <section id='feedback' className='sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className='2xl:max-w-[1280px] w-full mx-auto flex flex-col'
      >
        {/* TÃ­tulo de secciÃ³n â€” patrÃ³n estÃ¡ndar de la home */}
        <TypingText title={`| ${fb.sectionLabel || 'Contacto'}`} textStyles='text-center' />
        <TitleText title={fb.title} textStyles='text-center pb-4' as='h2' />

        {/* Columnas */}
        <div className='mt-10 flex lg:flex-row flex-col gap-6'>
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className='flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4
            rounded-[32px] border-[1px] border-[#6a6a6a] relative'
          >
            <div className='feedback-gradient' />
            <p className='font-normal sm:text-[16px] text-[12px] sm:leading-[20px] leading-[16px] text-white/80'>
              {fb.subtitle}
            </p>
            <p className='mt-[24px] font-normal sm:text-[19px] text-[16px] sm:leading-[32px] leading-[28px] text-white/90'>
              {fb.text}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className='mt-6 self-start px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 hover:-translate-y-0.5'
            >
              {fb.contactButton || 'Contacto'}
            </button>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            className='relative flex-1 flex justify-center items-center min-h-[300px] lg:min-h-[450px]'
          >
            <Image
              src='/planet-09.png'
              alt='Contacto PressurePro LATAM - Solicitar cotizaciÃ³n sistema TPMS para flotas comerciales y minerÃ­a'
              fill
              loading='lazy'
              quality={85}
              sizes='(max-width: 1024px) 100vw, 50vw'
              className='object-cover rounded-[40px]'
            />
            <motion.div
              variants={zoomIn(0.4, 1)}
              className='lg:block hidden absolute -left-[7%] -top-[8%] w-[120px] h-[120px] z-10 hover:scale-110 hover:rotate-3 transition-transform duration-500 cursor-pointer drop-shadow-2xl'
            >
              <Image
                src='/stamp.png'
                alt='Sello certificación PressurePro TPMS - Líder en sistemas de monitoreo'
                width={120}
                height={120}
                loading='lazy'
                quality={90}
                className='object-contain'
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal de contacto reutilizable */}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} type='contact' />
    </section>
  );
};

export default Feedback;
