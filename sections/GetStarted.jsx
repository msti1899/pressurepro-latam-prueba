'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import StartSteps from '../components/StartSteps';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import ContactModal from '../components/ContactModal';

const GetStarted = () => {
  const { translations, language } = useContext(LanguageContext);
  const [modalType, setModalType] = useState(null);

  return (
    <section id='getstarted' className='sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8'
      >
        <motion.div
          variants={planetVariants('left')}
          className='flex-1 flex justify-center items-center relative'
        >
          <Image
            src='/get-started.png'
            alt='Beneficios sistema TPMS PressurePro - Monitoreo de presión y temperatura de neumáticos para flotas comerciales'
            width={450}
            height={450}
            loading="lazy"
            quality={85}
            sizes="(max-width: 1024px) 100vw, 450px"
            className='w-[80%] md:w-[90%] h-auto object-contain'
          />
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className='flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title={`| ${translations.getStarted.subtitle}`} />
          <TitleText title={translations.getStarted.title} as='h2' />
          <div className='mt-[20px] flex flex-col max-w-[370px] gap-[30px]'>
            {(translations.getStarted.features || []).map((feature, index) => (
              <StartSteps
                key={feature}
                number={index + 1}
                text={feature}
              />
            ))}
          </div>
          {/* CTA Demo */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.4, 0.8)}
            className='mt-8 flex flex-wrap gap-3'
          >
            <button
              onClick={() => setModalType('demo')}
              className='px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 hover:-translate-y-0.5 hover:shadow-purple-500/40 transition-all duration-300 min-h-[48px] flex items-center gap-2'
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              {translations?.cta?.demoButton || 'Demo Gratuita'}
            </button>
            <button
              onClick={() => setModalType('quote')}
              className='px-5 py-3 rounded-xl border border-purple-500/50 text-purple-300 font-semibold text-sm hover:bg-purple-600/20 hover:border-purple-400 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2'
            >
              {translations?.cta?.quoteButton || 'Solicitar Cotización'}
            </button>
          </motion.div>
          <ContactModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'contact'} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default GetStarted