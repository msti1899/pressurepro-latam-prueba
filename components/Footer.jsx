'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { socials } from '../constants/data';
import { footerVariants } from '../utils/motion';
import { LanguageContext } from '../context/LanguageContext';
import { WHATSAPP_NUMBER } from '../config/whatsapp';

const Footer = () => {
  const { translations } = useContext(LanguageContext);

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
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.industriesTitle || 'Industrias'}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/industries/mineria' title={translations?.footer?.mining || "Minería"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.mining || 'Minería'}
                </Link>
              </li>
              <li>
                <Link href='/industries/transporte' title={translations?.footer?.transport || "Transporte"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.transport || 'Transporte'}
                </Link>
              </li>
              <li>
                <Link href='/industries/agricultura' title={translations?.footer?.agriculture || "Agricultura"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.agriculture || 'Agricultura'}
                </Link>
              </li>
              <li>
                <Link href='/industries/forestal' title={translations?.footer?.forestry || "Forestal"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.forestry || 'Forestal'}
                </Link>
              </li>
              <li>
                <Link href='/industries/portuario' title={translations?.footer?.port || "Portuario"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.port || 'Portuario'}
                </Link>
              </li>
              <li>
                <Link href='/industries/industrial' title={translations?.footer?.industrial || "Industrial"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.industrial || 'Industrial'}
                </Link>
              </li>
              <li>
                <Link href='/partners' title={translations?.partners?.navLabel || "Partners OEM"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.partners?.navLabel || 'Partners OEM'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.productsTitle || 'Productos'}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/#insights' title={translations?.footer?.tpmsSensors || "Sensores TPMS"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.tpmsSensors || 'Sensores TPMS'}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title={translations?.footer?.pulseDisplay || "Pulse Display"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.pulseDisplay || 'Pulse Display'}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title={translations?.footer?.linkHDLTUR || "Link HD/LT/UR"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.linkHDLTUR || 'Link HD/LT/UR'}
                </Link>
              </li>
              <li>
                <Link href='/#insights' title={translations?.footer?.fxFleet || "Fx Fleet"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.fxFleet || 'Fx Fleet'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.resourcesTitle || 'Recursos'}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/faq' title={translations?.footer?.faq || "Preguntas Frecuentes"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.faq || 'Preguntas Frecuentes'}
                </Link>
              </li>
              <li>
                <Link href='/#getstarted' title={translations?.footer?.benefits || "Beneficios TPMS"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.benefits || 'Beneficios TPMS'}
                </Link>
              </li>
              <li>
                <Link href='/#whatsnew' title={translations?.footer?.whyPressurePro || "Por qué PressurePro"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.whyPressurePro || 'Por qué PressurePro'}
                </Link>
              </li>
              <li>
                <Link href='/#about' title={translations?.footer?.aboutUs || "Acerca de Nosotros"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.aboutUs || 'Acerca de Nosotros'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>{translations?.footer?.contactTitle || 'Contacto'}</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/#feedback' title={translations?.footer?.requestQuote || "Solicitar Cotización"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.requestQuote || 'Solicitar Cotización'}
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} title="Chat WhatsApp" target='_blank' rel='noopener noreferrer' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href='mailto:info@pressurepro-latam.com' title="Email" className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Email
                </a>
              </li>
              <li>
                <Link href='/#world' title={translations?.footer?.coverage || "Cobertura"} className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  {translations?.footer?.coverage || 'Cobertura'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='mb-[30px] h-[1px] bg-white opacity-10' />

          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='font-normal text-[12px] sm:text-[14px] text-white/50 text-center tracking-wider uppercase'>
              Pressurepro-latam Las Piedras, Uruguay
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
