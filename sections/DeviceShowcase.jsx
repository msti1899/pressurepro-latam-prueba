'use client';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { TypingText, TitleText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';

// Imágenes reales — solo JPG/JPEG (los .heic no son soportados por navegadores)
// El array de imageSrcs es fijo; los labels vienen de translations
const IMAGE_SRCS = [
  '/imagenes_reales/PressurePro on Doe Run Mining Truck.jpg',
  '/imagenes_reales/Sensor on commercial truck tire.jpg',
  '/imagenes_reales/BELAZ 75131, Kemerovo, Karacan Invest sensors3.JPG',
  '/imagenes_reales/20260423_172905000_iOS.jpg',
  '/imagenes_reales/20260423_180951000_iOS.jpg',
  '/imagenes_reales/BELAZ 75473 Install, from SKD.JPG',
  '/imagenes_reales/20260423_180956000_iOS.jpg',
  '/imagenes_reales/IMG_1895.jpg',
];

const IMAGE_TAGS = ['MINING', 'TRANSPORT', 'MINING', 'INSTALL', 'SENSOR', 'MINING', 'INSTALL', 'TRANSPORT'];

const TAG_COLORS = {
  MINING:    'bg-amber-500/20 text-amber-300 border border-amber-500/40',
  TRANSPORT: 'bg-blue-500/20  text-blue-300  border border-blue-500/40',
  INSTALL:   'bg-purple-500/20 text-purple-300 border border-purple-500/40',
  SENSOR:    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
};

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-2.5 left-2.5 w-5 h-5 border-l-2 border-t-2 border-purple-400/80 rounded-tl" />
      <span className="absolute top-2.5 right-2.5 w-5 h-5 border-r-2 border-t-2 border-purple-400/80 rounded-tr" />
      <span className="absolute bottom-2.5 left-2.5 w-5 h-5 border-l-2 border-b-2 border-purple-400/80 rounded-bl" />
      <span className="absolute bottom-2.5 right-2.5 w-5 h-5 border-r-2 border-b-2 border-purple-400/80 rounded-br" />
    </>
  );
}

function ImageCell({ src, label, tag, className = '', delay = 0 }) {
  return (
    <motion.div
      variants={fadeIn('up', 'tween', delay, 0.55)}
      className={`relative overflow-hidden rounded-2xl group cursor-default ${className}`}
    >
      {/* Foto */}
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        draggable={false}
      />

      {/* Degradado inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

      {/* Líneas de escaneo (efecto HUD) */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,200,255,0.9) 2px, rgba(200,200,255,0.9) 3px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Borde exterior */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-purple-500/55 transition-colors duration-400 pointer-events-none" />

      {/* Resplandor interior en hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none shadow-[inset_0_0_28px_rgba(139,92,246,0.18)]" />

      {/* Brackets de esquina (aparecen en hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <CornerBrackets />
      </div>

      {/* Punto de estado pulsante */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-emerald-300/80 text-[9px] font-mono font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          LIVE
        </span>
      </div>

      {/* Tag tipo badge */}
      <div className="absolute top-3 right-3 pointer-events-none">
        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-sm ${TAG_COLORS[tag] || TAG_COLORS.SENSOR}`}>
          {tag}
        </span>
      </div>

      {/* Label inferior */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
        <p className="text-white text-xs font-medium leading-tight drop-shadow-lg truncate">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

const DeviceShowcase = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations?.deviceShowcase;

  // Fallbacks en español por si el locale no cargó aún
  const eyebrow     = t?.eyebrow   || '| Tecnología en campo';
  const titleMain   = t?.title     || 'Nuestros dispositivos';
  const titleAccent = t?.titleAccent || 'en acción';
  const subtitle    = t?.subtitle  || 'Instalaciones en flotas mineras, portuarias y de transporte.';
  const footer      = t?.footer    || '// FIELD DEPLOYMENTS · FIELD INSTALLATIONS · PRESSURPRO™ TECHNOLOGY';
  const labels      = t?.imageLabels || [
    'Flota Minera · Doe Run, EE.UU.',
    'Sensor OTR en camión de ruta',
    'BELAZ 75131 · Kemerovo',
    'Instalación en campo',
    'Sensor en rueda OTR',
    'BELAZ 75473 · SKD Install',
    'Detalle de instalación',
    'Sensor en camión de transporte',
  ];

  return (
    <section className="sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10">
      {/* Fondo difuso decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-800/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-800/10 blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.08 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TypingText title={eyebrow} textStyles="text-center" />
        <TitleText
          title={<>{titleMain} <span className="text-purple-400">{titleAccent}</span></>}
          textStyles="text-center"
          as="h2"
        />
        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 0.8)}
          className="mt-4 text-center text-white/60 text-[15px] max-w-2xl mx-auto mb-10"
        >
          {subtitle}
        </motion.p>

        {/* ── Mosaico bento 3×4 ────────────────────────────────────────── */}
        <div
          className="grid grid-cols-3 gap-3"
          style={{ gridTemplateRows: 'repeat(4, 210px)' }}
        >
          {/* Imagen 0 — grande, col 1-2 / filas 1-2 */}
          <ImageCell src={IMAGE_SRCS[0]} label={labels[0]} tag={IMAGE_TAGS[0]} className="col-start-1 col-span-2 row-start-1 row-span-2" delay={0.25} />
          {/* Imagen 1 — col 3 / fila 1 */}
          <ImageCell src={IMAGE_SRCS[1]} label={labels[1]} tag={IMAGE_TAGS[1]} className="col-start-3 row-start-1" delay={0.32} />
          {/* Imagen 2 — col 3 / fila 2 */}
          <ImageCell src={IMAGE_SRCS[2]} label={labels[2]} tag={IMAGE_TAGS[2]} className="col-start-3 row-start-2" delay={0.38} />
          {/* Imagen 3 — col 1 / fila 3 */}
          <ImageCell src={IMAGE_SRCS[3]} label={labels[3]} tag={IMAGE_TAGS[3]} className="col-start-1 row-start-3" delay={0.30} />
          {/* Imagen 4 — col 2 / fila 3 */}
          <ImageCell src={IMAGE_SRCS[4]} label={labels[4]} tag={IMAGE_TAGS[4]} className="col-start-2 row-start-3" delay={0.36} />
          {/* Imagen 5 — col 3 / filas 3-4 (alta) */}
          <ImageCell src={IMAGE_SRCS[5]} label={labels[5]} tag={IMAGE_TAGS[5]} className="col-start-3 row-start-3 row-span-2" delay={0.28} />
          {/* Imagen 6 — col 1 / fila 4 */}
          <ImageCell src={IMAGE_SRCS[6]} label={labels[6]} tag={IMAGE_TAGS[6]} className="col-start-1 row-start-4" delay={0.34} />
          {/* Imagen 7 — col 2 / fila 4 */}
          <ImageCell src={IMAGE_SRCS[7]} label={labels[7]} tag={IMAGE_TAGS[7]} className="col-start-2 row-start-4" delay={0.40} />
        </div>

        {/* Pie de sección */}
        <motion.p
          variants={fadeIn('up', 'tween', 0.5, 0.7)}
          className="mt-6 text-center text-white/30 text-xs font-mono tracking-widest"
        >
          {footer}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default DeviceShowcase;
