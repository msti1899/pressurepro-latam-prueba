'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
import { LanguageContext } from '../context/LanguageContext';

const Feedback = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section id='feedback' className='sm:px-16 xs:px-8 px-6 py-8 md:py-12 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-6'
      >
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className='flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 
          rounded-[32px] border-[1px] border-[#6a6a6a] relative'
        >
          <div className='feedback-gradient'/>
          <div>
            <h2 className='font-bold sm:text-[28px] text-[24px] sm:leading-[36px] leading-[32px] text-white'>
              {translations?.feedback?.title || 'PressurePro LATAM'}
            </h2>
            <p className='mt-[8px] font-normal sm:text-[16px] text-[12px] sm:leading-[20px] leading-[16px] text-white/80'>
              PressurePro | Latam
            </p>
          </div>
          <p className='mt-[24px] font-normal sm:text-[19px] text-[16px] sm:leading-[32px] leading-[28px] text-white/90'>
            {translations.feedback.text}
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className='relative flex-1 flex justify-center items-center min-h-[300px] lg:min-h-[450px]'
        >
          <Image
            src='/planet-09.png'
            alt='Contacto PressurePro LATAM - Solicitar cotización sistema TPMS para flotas comerciales y minería'
            fill
            loading="lazy"
            quality={85}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className='object-cover rounded-[40px]'
          />
          <motion.div
            variants={zoomIn(0.4, 1)}
            className='lg:block hidden absolute -left-[10%] top-[3%] w-[155px] h-[155px] z-10'
          >
            <Image
              src='/stamp.png'
              alt='Sello certificación PressurePro TPMS - Líder en sistemas de monitoreo'
              width={155}
              height={155}
              loading="lazy"
              quality={90}
              className='object-contain'
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Feedback
