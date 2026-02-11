'use client';
import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { worlds } from '../constants/data';
import { TitleText, TypingText } from '../components/CustomTexts';
import ExploreCard from '../components/ExploreCard';
import { LanguageContext } from '../context/LanguageContext';

const Explore = () => {
  const [active, setActive] = useState('world-2');
  const { translations } = useContext(LanguageContext);
  const [viewMode, setViewMode] = useState('desktop'); // 'mobile' | 'tablet' | 'desktop'

  useEffect(() => {
    const checkViewMode = () => {
      const w = window.innerWidth;
      if (w < 768) setViewMode('mobile');
      else if (w < 1024) setViewMode('tablet');
      else setViewMode('desktop');
    };

    checkViewMode();
    window.addEventListener('resize', checkViewMode);
    return () => window.removeEventListener('resize', checkViewMode);
  }, []);

  const isMobile = viewMode === 'mobile';
  const isTablet = viewMode === 'tablet';

  return (
    <section className='sm:p-16 xs:p-8 px-4 py-5 md:py-12' id='mercados'>
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
        />

        {/* Móvil: grid 2 cols  |  Tablet: grid 3 cols  |  Desktop: accordion horizontal */}
        {isMobile || isTablet ? (
          <div className={`mt-[20px] grid gap-3 pb-4 ${
            isMobile ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {worlds.map((world, index) => (
              <ExploreCard
                key={world.id}
                {...world}
                index={index}
                active={active}
                handleClick={setActive}
                viewMode={viewMode}
                translations={translations}
                marketInfo={translations.explore.marketInfo}
              />
            ))}
          </div>
        ) : (
          <div className='mt-[10px] flex lg:flex-row flex-col gap-5 pb-8'>
            {worlds.map((world, index) => (
              <ExploreCard
                key={world.id}
                {...world}
                index={index}
                active={active}
                handleClick={setActive}
                viewMode={viewMode}
                translations={translations}
                marketInfo={translations.explore.marketInfo}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default Explore