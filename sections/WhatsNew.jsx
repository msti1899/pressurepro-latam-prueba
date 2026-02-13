'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import NewFeatures from '../components/NewFeatures';
import { LanguageContext } from '../context/LanguageContext';

const WhatsNew = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section id='whatsnew' className='sm:px-16 xs:px-8 px-6 py-8 md:py-12 relative z-10'>
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
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className='flex-[0.75] flex justify-center flex-col'
        >
          <TypingText title={`| ${translations.whatsNew.title}`} />
          <TitleText title={translations.whatsNew.title2} as='h2' />
          <div className='mt-[24px] flex flex-wrap justify-between gap-[20px]'>
            {translations.whatsNew.newFeatures.map((feature) => (
              <NewFeatures
                key={feature.title}
                imgUrl={feature.imgUrl}
                title={feature.title}
                subtitle={feature.subtitle}
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={planetVariants('right')}
          className='flex-1 flex justify-center items-center relative'
        >
          <Image
            src='/whats-new.png'
            alt='Tecnología TPMS PressurePro - Sensores inteligentes de monitoreo de neumáticos en tiempo real'
            width={450}
            height={450}
            loading="lazy"
            quality={85}
            className='w-[90%] h-auto object-contain'
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhatsNew;