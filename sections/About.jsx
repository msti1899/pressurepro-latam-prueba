'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TypingText, TitleText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';

const About = () => {
  const { translations } = useContext(LanguageContext);
  
  // Detectar y convertir palabras clave en enlaces internos
  const renderTextWithLinks = (text) => {
    // Mapeo de palabras clave a slugs de industrias
    const industryKeywords = {
      'minería': 'mineria',
      'mining': 'mineria',
      'mineração': 'mineria',
      'transporte': 'transporte',
      'transport': 'transporte',
      'agrícola': 'agricultura',
      'agricultura': 'agricultura',
      'agriculture': 'agricultura',
      'forestal': 'forestal',
      'forestry': 'forestal',
      'florestal': 'forestal',
      'portuaria': 'portuario',
      'portuário': 'portuario',
      'port': 'portuario',
      'industrial': 'industrial',
    };
    
    // Crear regex para detectar keywords (case insensitive)
    const keywordPattern = new RegExp(`\\b(${Object.keys(industryKeywords).join('|')})\\b`, 'gi');
    
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Encontrar todas las coincidencias
    const matches = [...text.matchAll(keywordPattern)];
    
    if (matches.length === 0) {
      return text;
    }
    
    matches.forEach((match, idx) => {
      const keyword = match[0];
      const keywordLower = keyword.toLowerCase();
      const slug = industryKeywords[keywordLower];
      const startIndex = match.index;
      
      // Agregar texto antes del keyword
      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }
      
      // Agregar el link
      parts.push(
        <Link 
          key={`link-${idx}-${slug}`}
          href={`/industries/${slug}`}
          className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 hover:decoration-purple-300 transition-colors font-semibold"
        >
          {keyword}
        </Link>
      );
      
      lastIndex = startIndex + keyword.length;
    });
    
    // Agregar texto después del último keyword
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };
  
  return (
    <section id='about' className='sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10'>
      <div className='gradient-02 z-0'/>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{
          once: false,
          amount: 0.25
        }}
        className='2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col'
      >
        <TypingText title={`| ${translations.about.title}`} textStyles='text-center'/>
        <TitleText title={translations.about.companyName} textStyles='text-center' as='h2' />
        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className='mt-[8px] font-normal sm:text-[24px] text-[18px] sm:leading-[38px] leading-[30px] text-center text-gray-200 max-w-[850px] mx-auto'
        >
          <span className='font-extrabold text-white'>{translations.about.companyName} </span>
          {renderTextWithLinks(translations.about.text)}
        </motion.p>
        
        {/* Sección de enlaces rápidos a industrias clave */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className='mt-6 flex flex-wrap justify-center gap-3 max-w-[800px] mx-auto'
        >
          <Link 
            href="/industries/mineria"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/30 text-purple-300 hover:from-purple-600/20 hover:to-indigo-600/20 hover:border-purple-400/50 transition-all text-sm font-medium"
          >
            Minería
          </Link>
          <Link 
            href="/industries/transporte"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/30 text-purple-300 hover:from-purple-600/20 hover:to-indigo-600/20 hover:border-purple-400/50 transition-all text-sm font-medium"
          >
            Transporte
          </Link>
          <Link 
            href="/industries/agricultura"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/30 text-purple-300 hover:from-purple-600/20 hover:to-indigo-600/20 hover:border-purple-400/50 transition-all text-sm font-medium"
          >
            Agricultura
          </Link>
          <Link 
            href="#mercados"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40 transition-all text-sm font-medium"
          >
            Ver todas las industrias →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;