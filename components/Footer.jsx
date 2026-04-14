'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { socials } from '../constants/data';
import { footerVariants } from '../utils/motion';
import { useLocale } from '../context/LocaleContext';

const Footer = () => {
  const { translations, getWhatsAppNumber } = useLocale();

  const handleEmailClick = React.useCallback(() => {
    const u = ['info', 'pressurepro-latam.com'].join('@');
    window.location.href = 'mailto:' + u;
  }, []);

  return (
    <motion.footer
      variants={footerVariants}
      initial='hidden'
      whileInView='show'
      className='sm:p-16 xs:p-8 px-6 py-12 relative'
    >
      <div className='footer-gradient' />
      <div className='2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-8'>
        <div className='flex items-center justify-between flex-wrap gap-5'>
          <h4 className='font-bold md:text-[64px] text-[36px] text-white'>
            PressurePro LATAM
          </h4>
        </div>

        {/* Sección de enlaces rápidos para SEO interno */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8'>
          {/* Industrias */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.industriesTitle}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/industries/mineria' title={translations?.footer?.mining} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.mining}
                </Link>
              </li>
              <li>
                <Link href='/industries/transporte' title={translations?.footer?.transport} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.transport}
                </Link>
              </li>
              <li>
                <Link href='/industries/agricultura' title={translations?.footer?.agriculture} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.agriculture}
                </Link>
              </li>
              <li>
                <Link href='/industries/forestal' title={translations?.footer?.forestry} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.forestry}
                </Link>
              </li>
              <li>
                <Link href='/industries/portuario' title={translations?.footer?.port} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.port}
                </Link>
              </li>
              <li>
                <Link href='/industries/industrial' title={translations?.footer?.industrial} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.industrial}
                </Link>
              </li>
              <li>
                <Link href='/partners' title={translations?.partners?.navLabel} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.partners?.navLabel}
                </Link>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.productsTitle}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/#insights' title={translations?.footer?.tpmsSensors} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.tpmsSensors}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title={translations?.footer?.pulseDisplay} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.pulseDisplay}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title={translations?.footer?.linkHDLTUR} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.linkHDLTUR}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title={translations?.footer?.fxFleet} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.fxFleet}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title='Connect 2.0' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Connect 2.0
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.resourcesTitle}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/faq' title={translations?.footer?.faq} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.faq}
                </Link>
              </li>
              <li>
                <Link href='/#getstarted' title={translations?.footer?.benefits} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.benefits}
                </Link>
              </li>
              <li>
                <Link href='/#whatsnew' title={translations?.footer?.whyPressurePro} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.whyPressurePro}
                </Link>
              </li>
              <li>
                <Link href='/#about' title={translations?.footer?.aboutUs} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.aboutUs}
                </Link>
              </li>
              <li>
                <Link href='/#roi-calculator' title={translations?.footer?.roiCalculator} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.roiCalculator}
                </Link>
              </li>
              <li>
                <Link href='/#featured-projects' title={translations?.footer?.featuredProjects} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.featuredProjects}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.contactTitle}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/#feedback' title={translations?.footer?.requestQuote} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.requestQuote}
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/${getWhatsAppNumber()}`} title="Chat WhatsApp" target='_blank' rel='noopener noreferrer' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  WhatsApp
                </a>
              </li>
              <li>
                <button
                  type='button'
                  onClick={handleEmailClick}
                  title='Email'
                  className='text-white/60 hover:text-purple-400 transition-colors text-[14px] cursor-pointer'
                >
                  Email
                </button>
              </li>
              <li>
                <Link href='/#world' title={translations?.footer?.coverage} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.coverage}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='mb-[30px] h-[1px] bg-white opacity-10' />

          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='font-normal text-[12px] sm:text-[14px] text-white/50 text-center tracking-wider uppercase'>
              Pressurepro-latam | Montevideo, Uruguay
            </p>

            <div className='flex gap-4'>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${social.name}`}
                  className="w-[30px] h-[30px] flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={social.url}
                    alt={social.name}
                    className='w-[20px] h-[20px] object-contain cursor-pointer'
                  />
                </a>
              ))}
            </div>

            <p className='text-[10px] text-white/20 text-center'>
              Copyright © {new Date().getFullYear()} PressurePro LATAM.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
