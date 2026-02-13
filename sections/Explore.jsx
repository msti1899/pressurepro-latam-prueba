'use client';
import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { worlds } from '../constants/data';
import { TitleText, TypingText } from '../components/CustomTexts';
import ExploreCard from '../components/ExploreCard';
import { LanguageContext } from '../context/LanguageContext';

const Explore = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section className='sm:px-16 xs:px-8 px-4 py-8 md:py-12' id='mercados'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.1
        }}
        className='2xl:max-w-[1280px] w-full mx-auto flex flex-col'
      >
        <TypingText title={`| ${translations.explore.title}`} textStyles='text-center'/>
        <TitleText 
          title={<>{translations.explore.subtitle} <br className='md:block hidden'/></>} 
          textStyles='text-center'
          as='h2'
        />

        {/* Cuadrícula 3x2 en desktop, 2x3 en móvil */}
        <div className='mt-[30px] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 pb-4'>
          {worlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              translations={translations}
              marketInfo={translations.explore.marketInfo}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Explore