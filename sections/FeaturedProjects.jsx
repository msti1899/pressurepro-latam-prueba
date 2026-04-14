'use client';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';

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
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
