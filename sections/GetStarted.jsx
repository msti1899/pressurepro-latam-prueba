'use client';
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import StartSteps from '../components/StartSteps';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const GetStarted = () => {
  const { translations, language } = useContext(LanguageContext);

  return (
    <section id='getstarted' className='sm:px-16 xs:px-8 px-6 py-8 md:py-12 relative z-10'>
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
            className='w-[80%] md:w-[90%] h-auto object-contain'
          />
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className='flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title={`| ${translations.getStarted.subtitle}`}/>
          <TitleText title={translations.getStarted.title} as='h2' />
          <div className='mt-[20px] flex flex-col max-w-[370px] gap-[20px]'>
            {translations.features[language].map((feature, index) => (
              <StartSteps
                key={feature}
                number={index + 1}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default GetStarted