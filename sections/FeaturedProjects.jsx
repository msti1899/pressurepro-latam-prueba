'use client';
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';
import ContactModal from '../components/ContactModal';

const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={fadeIn('up', 'tween', index * 0.15, 0.6)}
    className="flex flex-col rounded-[24px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#16142a] via-[#1a1830] to-[#1f1d3a] hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-all duration-500 shadow-xl"
  >
    {/* Imagen */}
    <div className="relative overflow-hidden h-[220px] flex-shrink-0">
      <img
        src={project.image}
        alt={project.title}
        className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      {/* Badge de país */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
        <img
          src={`https://flagcdn.com/${project.countryCode}.svg`}
          alt={`Bandera de ${project.countryName}`}
          className="w-5 h-4 object-cover rounded-sm"
        />
        <span className="text-white text-xs font-semibold">{project.countryName}</span>
      </div>
    </div>

    {/* Contenido */}
    <div className="flex flex-col flex-1 p-6 gap-3">
      <h3 className="font-bold text-[18px] md:text-[20px] text-white leading-snug">
        {project.title}
      </h3>
      <p className="text-white/60 text-[14px] leading-relaxed flex-1">
        {project.description}
      </p>
    </div>
  </motion.div>
);

const FeaturedProjects = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations?.featuredProjects;
  const [modalType, setModalType] = useState(null);

  if (!t) return null;

  return (
    <section id="featured-projects" className="sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TypingText title={`| ${t.eyebrow}`} textStyles="text-center" />
        <TitleText title={t.title} textStyles="text-center" as="h2" />
        <p className="mt-4 text-center text-white/60 text-[15px] max-w-2xl mx-auto">
          {t.subtitle}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {t.projects.map((project, index) => (
            <ProjectCard key={project.countryCode + index} project={project} index={index} />
          ))}
        </div>

        {/* CTA al pie de la sección */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.5, 0.8)}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <p className="text-white/50 text-sm text-center max-w-md">
            {t.ctaHint || translations?.cta?.ctaHint || ''}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setModalType('quote')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 hover:-translate-y-0.5 hover:shadow-purple-500/45 transition-all duration-300 min-h-[48px] flex items-center gap-2"
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
              {translations?.cta?.quoteButton || 'Solicitar Cotización'}
            </button>
            <button
              onClick={() => setModalType('demo')}
              className="px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2"
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              {translations?.cta?.demoButton || 'Demo Gratuita'}
            </button>
          </div>
        </motion.div>

        <ContactModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'contact'} />
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
