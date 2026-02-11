'use client';
import React from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import Link from 'next/link';
import { ID_TO_SLUG } from '../constants/industries';

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick, translations, marketInfo, isMobileView }) => (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        transition: { duration: 1.2 }
      }}
      className={`relative my-4 md:my-6 lg:my-8
        ${isMobileView
          ? 'w-full flex-auto h-[320px] mb-8'
          : `${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'} h-[350px] md:h-[450px] lg:h-[550px]`} 
        flex items-center justify-center min-w-[170px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer
        ${isMobileView ? '' : 'hover:opacity-90'}`}
      onClick={() => !isMobileView && handleClick(id)}
    >
      <img
        src={imgUrl}
        alt={title}
        className='absolute w-full h-full object-cover rounded-[24px]'
      />

      {(!isMobileView && active !== id) ? (
        <div className='flex flex-col items-center absolute z-0 lg:bottom-20 bottom-10'>
          <h3 className='font-semibold sm:text-[26px] text-[18px] text-white lg:rotate-[-90deg] lg:origin-[0,0] text-center'>
            {translations.explore.industries[id]}
          </h3>
        </div>
      ) : (
        <div className='absolute bottom-0 p-4 md:p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-[24px] glassmorphism mb-[16px]'>
              <img
                src='/pp-white.png'
                alt='pressurepro-logo'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
            <Link
              href={`/industries/${ID_TO_SLUG[id] || id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm md:text-base font-medium glassmorphism"
              >
                {translations.explore.showInfo || '+ Info'}
              </motion.span>
            </Link>
          </div>

          <h2 className='mt-[12px] md:mt-[24px] font-semibold text-[18px] sm:text-[24px] md:text-[32px] text-white'>
            {translations.explore.industries[id]}
          </h2>

          {/* Información que se muestra por defecto */}
          <div className="mt-2 md:mt-4">
            <div className="p-2 md:p-4 rounded-[16px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm">
              <p className="text-white text-xs md:text-base line-clamp-3 md:line-clamp-none">
                {marketInfo && marketInfo[id] ? marketInfo[id] : 'Información no disponible para este mercado.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
)

export default ExploreCard