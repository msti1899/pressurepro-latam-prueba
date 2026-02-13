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
            <h3 className='font-bold text-[18px] text-white mb-4'>Industrias</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/industries/mineria' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Minería
                </Link>
              </li>
              <li>
                <Link href='/industries/transporte' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Transporte
                </Link>
              </li>
              <li>
                <Link href='/industries/agricultura' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Agricultura
                </Link>
              </li>
              <li>
                <Link href='/industries/forestal' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Forestal
                </Link>
              </li>
              <li>
                <Link href='/industries/portuario' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Portuario
                </Link>
              </li>
              <li>
                <Link href='/industries/industrial' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Industrial
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Productos */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>Productos</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/#insights' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Sensores TPMS
                </Link>
              </li>
              <li>
                <Link href='/#insights' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Pulse Display
                </Link>
              </li>
              <li>
                <Link href='/#insights' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Link HD/LT/UR
                </Link>
              </li>
              <li>
                <Link href='/#insights' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Fx Fleet
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Recursos */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>Recursos</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/faq' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href='/#getstarted' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Beneficios TPMS
                </Link>
              </li>
              <li>
                <Link href='/#whatsnew' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Por qué PressurePro
                </Link>
              </li>
              <li>
                <Link href='/#about' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Acerca de Nosotros
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className='font-bold text-[18px] text-white mb-4'>Contacto</h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/#feedback' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Solicitar Cotización
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target='_blank' rel='noopener noreferrer' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href='mailto:info@pressurepro-latam.com' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Email
                </a>
              </li>
              <li>
                <Link href='/#world' className='text-white/60 hover:text-purple-400 transition-colors text-[14px]'>
                  Cobertura
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
