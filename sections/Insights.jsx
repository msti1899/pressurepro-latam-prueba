'use client';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import InsightsCard from '../components/InsightsCard';
import { LanguageContext } from '../context/LanguageContext';

const Insights = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section id='insights' className='sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='2xl:max-w-[1280px] w-full mx-auto flex flex-col'
      >
        <TypingText title={`| ${translations.insights.typingTex}`} textStyles='text-center'/>
        <TitleText title={translations.insights.title} textStyles='text-center' as='h2' />
        <div className='mt-[50px] grid grid-cols-1 md:grid-cols-2 gap-[30px]'>
          {translations.insights.products.map((insight, index) => (
            <InsightsCard key={`insight-${index}`} {...insight} index={index + 1}/>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Insights