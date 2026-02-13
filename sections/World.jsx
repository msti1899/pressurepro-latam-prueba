'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';

const World = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section id='world' className='relative w-full h-[600px] flex items-center justify-center overflow-hidden z-10 bg-primary-black'>
      {/* Fondo de Mapa */}
      <div className='absolute inset-0 z-0 bg-primary-black/30'>
        <div className='relative w-full h-full'>
          <Image
            src='/map.png'
            alt='Mapa de cobertura PressurePro LATAM'
            fill
            className='object-cover opacity-50'
          />
        </div>
      </div>
      
      {/* Overlay gradiente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-transparent to-primary-black/90 z-0 pointer-events-none" />

      {/* Contenido centrado */}
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='relative z-10 max-w-[1000px] w-full mx-auto flex flex-col items-center justify-center px-6 text-center'
      >
        <TypingText title={`| ${translations.world.typingTex}`} textStyles='text-center drop-shadow-md'/>     
        <TitleText 
          title={
          <span className="drop-shadow-lg filter">
            {translations.world.title}
          </span>
          }
          textStyles='text-center mb-6' 
        />

        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className='mt-4 max-w-[800px]'
        >
          <p className='text-center text-gray-100 text-[18px] sm:text-[22px] leading-relaxed drop-shadow-md font-medium'>
            {translations.world.description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default World