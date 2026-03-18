import { useRouter } from 'next/router';
import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, textVariant } from '../utils/motion';
import { TypingText, TitleText } from '../components/CustomTexts';
import { Navbar, Footer, WhatsAppButton, Breadcrumbs } from '../components';
import { LanguageContext } from '../context/LanguageContext';
import { COUNTRIES } from '../config/countries';
import { buildAlternates, shouldNoIndexAlternateLanguage } from '../config/localization';
import { FUEL_ARTICLE_CONTENT } from '../config/localization/pages/fuelContent';
import { DEFAULT_LOCALE, getBaseUrl } from '../config/runtime';

// ─── Contenido del artículo por idioma ───────────────────────
const ARTICLE_CONTENT = FUEL_ARTICLE_CONTENT;

export default function FuelArticlePage() {
  const router = useRouter();
  const { translations } = useContext(LanguageContext);
  const locale = router.locale || DEFAULT_LOCALE;
  const langBase = COUNTRIES[locale]?.language || locale;

  const t = ARTICLE_CONTENT[langBase] || ARTICLE_CONTENT.es;
  const countryCode = COUNTRIES[locale] ? locale : null;

  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/fuel`;

  const alternates = buildAlternates(baseUrl, '/fuel');
  const shouldNoIndex = shouldNoIndexAlternateLanguage(langBase, countryCode);

  // Structured Data - Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.heroTitle,
    "description": t.seoDescription,
    "author": {
      "@type": "Organization",
      "name": "PressurePro LATAM"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PressurePro LATAM",
      "url": baseUrl
    },
    "mainEntityOfPage": pageUrl,
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-01"
  };

  return (
    <>
      <Head>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDescription} />
        <meta name="keywords" content={t.seoKeywords} />
        {shouldNoIndex && (
          <>
            <meta name="robots" content="noindex,follow" />
            <meta name="googlebot" content="noindex,follow" />
          </>
        )}
        <link rel="canonical" href={pageUrl} />

        {alternates.map(({ hreflang, href }) => (
          <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
        ))}

        <meta property="og:type" content="article" />
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${baseUrl}/camion-neon.png`} />
        <meta property="og:site_name" content="PressurePro LATAM" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seoTitle} />
        <meta name="twitter:description" content={t.seoDescription} />
        <meta name="twitter:image" content={`${baseUrl}/camion-neon.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <div className="bg-primary-black tech-bg overflow-hidden min-h-screen">
        <Navbar />

        {/* ═══ HERO ═══ */}
        <section className="relative w-full pt-[95px] sm:pt-[110px] pb-16 md:pb-24 px-6 sm:px-16 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="/camion-neon.png" alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-black via-primary-black/80 to-primary-black" />
          </div>

          <div className="absolute top-[77px] sm:top-[95px] left-0 w-full z-20">
            <Breadcrumbs items={[
              { label: translations?.faqPage?.home || translations?.navbar?.about, href: '/' },
              { label: t.breadcrumb, href: null }
            ]} />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 2xl:max-w-[1280px] mx-auto pt-16 md:pt-20"
          >
            <motion.div variants={textVariant(0.3)}>
              <TypingText title={`| ${t.typingText}`} textStyles="text-center" />
            </motion.div>
            <motion.h1
              variants={textVariant(0.5)}
              className="font-bold text-[28px] sm:text-[38px] md:text-[52px] text-white leading-tight text-center max-w-[900px] mx-auto mt-4"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p
              variants={fadeIn('up', 'tween', 0.6, 1)}
              className="text-secondary-white text-lg md:text-xl max-w-[650px] mx-auto text-center mt-6"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Stats rápidas */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.8, 1)}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-[800px] mx-auto"
            >
              {[
                { value: '142', label: t.statDistance, icon: '🛣️' },
                { value: '77', label: t.statSpeed, icon: '⚡' },
                { value: '4', label: t.statWheels, icon: '🔧' },
                { value: '33%', label: t.statTotal, icon: '📊' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl mb-1 block">{stat.icon}</span>
                  <span className="text-white font-bold text-2xl md:text-3xl block">{stat.value}</span>
                  <span className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ INTRODUCCIÓN ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.introTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6 text-secondary-white text-[16px] md:text-[18px] leading-relaxed">
              <p>{t.introText1}</p>
              <p>{t.introText2}</p>
              <p>{t.introText3}</p>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-500/30"
            >
              <p className="text-white font-semibold text-lg md:text-xl text-center">
                {t.introHighlight}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ EXPERIMENTO ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-white/[0.02]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.experimentTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6 text-secondary-white text-[16px] md:text-[18px] leading-relaxed">
              <p>{t.experimentText1}</p>
              <p className="font-medium text-white">{t.experimentText2}</p>
              <p>{t.experimentText3}</p>
              <p>{t.experimentText4}</p>
            </motion.div>

            {/* Info de neumáticos */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="mt-8 flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10"
            >
              <span className="text-3xl">🛞</span>
              <p className="text-secondary-white text-[15px] md:text-[16px] leading-relaxed">
                {t.tireInfo}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ ETAPA 1 ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            {/* Badge de etapa */}
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h2 className="font-bold text-[24px] md:text-[36px] text-white">
                {t.stage1Title}
              </h2>
            </motion.div>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6">
              <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-white font-semibold text-lg mb-3">{t.stage1Ready}</h3>
                <p className="text-secondary-white text-[15px] md:text-[16px] leading-relaxed">
                  {t.stage1ReadyText}
                </p>
              </div>

              <p className="text-white font-medium text-lg">{t.stage1ResultTitle}</p>
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.stage1ResultText}</p>

              {/* Resultados etapa 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-cyan-900/20 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[1]}</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage1Truck1}</p>
                  <p className="text-white font-bold text-2xl mt-2">27.81 <span className="text-sm font-normal text-white/60">l/100km</span></p>
                </div>
                <div className="p-5 bg-amber-900/20 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[2]}</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage1Truck2}</p>
                  <p className="text-white font-bold text-2xl mt-2">29.27 <span className="text-sm font-normal text-white/60">l/100km</span></p>
                </div>
              </div>

              <p className="text-secondary-white text-[15px] italic">{t.stage1Note}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ CAMBIO DE PRESIÓN ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-white/[0.02]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.pressureChangeTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6">
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.pressureChangeText1}</p>

              {/* Diagrama visual de ruedas */}
              <div className="p-6 bg-gradient-to-b from-red-900/20 to-transparent rounded-2xl border border-red-500/20">
                <p className="text-white text-[16px] md:text-[18px] font-medium mb-4">{t.pressureChangeText2}</p>

                {/* Representación visual del eje motriz */}
                <div className="flex justify-center my-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-white/40 text-xs uppercase tracking-wider mb-2">{t.tableHeader[1]}</span>
                    <div className="flex gap-6">
                      {/* Eje dirección */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-8">
                          <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                            <span className="text-[9px] text-green-300 font-bold">115</span>
                          </div>
                          <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                            <span className="text-[9px] text-green-300 font-bold">115</span>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded" />
                      </div>
                      {/* Eje motriz */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-8">
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-red-500/50 border border-red-500/70 flex items-center justify-center animate-pulse">
                              <span className="text-[9px] text-red-300 font-bold">90</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded" />
                      </div>
                      {/* Eje trailer */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-8">
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                            <div className="w-8 h-14 rounded-md bg-green-500/40 border border-green-500/60 flex items-center justify-center">
                              <span className="text-[9px] text-green-300 font-bold">115</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-6 mt-2">
                      <span className="text-[10px] text-white/40 w-[70px] text-center">PSI</span>
                      <span className="text-[10px] text-red-400 w-[70px] text-center font-bold">⚠ 90 PSI</span>
                      <span className="text-[10px] text-white/40 w-[70px] text-center">PSI</span>
                    </div>
                  </div>
                </div>

                <p className="text-red-300 font-semibold text-center text-[15px]">{t.pressureChangeHighlight}</p>
              </div>

              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.pressureChangeText3}</p>
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed italic">{t.pressureChangeText4}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ ETAPA 2 ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h2 className="font-bold text-[24px] md:text-[36px] text-white">
                {t.stage2Title}
              </h2>
            </motion.div>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6">
              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.stage2ResultText}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-red-900/20 rounded-xl border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[1]} — 90 PSI</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage2Truck1}</p>
                  <p className="text-red-400 font-bold text-2xl mt-2">30.18 <span className="text-sm font-normal text-red-300/60">l/100km</span></p>
                  <p className="text-red-400 text-sm mt-1 font-semibold">↑ +8.5%</p>
                </div>
                <div className="p-5 bg-green-900/20 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">{t.tableHeader[2]} — 115 PSI</span>
                  </div>
                  <p className="text-white text-[15px]">{t.stage2Truck2}</p>
                  <p className="text-green-400 font-bold text-2xl mt-2">29.70 <span className="text-sm font-normal text-green-300/60">l/100km</span></p>
                  <p className="text-green-400/60 text-sm mt-1">~ +1.5%</p>
                </div>
              </div>

              <p className="text-secondary-white text-[16px] md:text-[18px] leading-relaxed">{t.stage2Consumption}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ RESULTADOS ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8 text-center">
              {t.resultsTitle}
            </motion.h2>

            {/* Resultado destacado */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-center p-8 md:p-12 bg-gradient-to-r from-red-900/30 via-orange-900/20 to-red-900/30 rounded-3xl border border-red-500/20 mb-8"
            >
              <p className="text-red-400 font-bold text-[48px] md:text-[72px] leading-none">
                +8.5%
              </p>
              <p className="text-white font-semibold text-lg md:text-xl mt-4">
                {t.resultsHighlight}
              </p>
              <p className="text-white/60 text-sm md:text-base mt-2 max-w-[500px] mx-auto">
                {t.resultsSubtext}
              </p>
            </motion.div>

            <motion.p variants={fadeIn('up', 'tween', 0.4, 1)} className="text-secondary-white text-center text-[16px] md:text-[18px] leading-relaxed">
              {t.resultsPercentage}
            </motion.p>

            {/* Tabla comparativa */}
            <motion.div variants={fadeIn('up', 'tween', 0.5, 1)} className="mt-10">
              <h3 className="text-white font-semibold text-xl mb-4 text-center">{t.tableTitle}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {t.tableHeader.map((h, i) => (
                        <th key={i} className={`p-3 md:p-4 text-left text-sm uppercase tracking-wider ${i === 0 ? 'text-white/40' : 'text-white font-semibold'} border-b border-white/10`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tableStage1}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage1Values[0]}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage1Values[1]}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tablePressure}</td>
                      <td className="p-3 md:p-4 text-red-400 text-sm font-semibold">{t.tablePressureValues[0]}</td>
                      <td className="p-3 md:p-4 text-green-400 text-sm">{t.tablePressureValues[1]}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tableStage2}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage2Values[0]}</td>
                      <td className="p-3 md:p-4 text-white text-sm">{t.tableStage2Values[1]}</td>
                    </tr>
                    <tr>
                      <td className="p-3 md:p-4 text-white/60 text-sm font-medium">{t.tableChange}</td>
                      <td className="p-3 md:p-4 text-red-400 text-sm font-bold">{t.tableChangeValues[0]}</td>
                      <td className="p-3 md:p-4 text-white/40 text-sm">{t.tableChangeValues[1]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ IMPACTO REAL ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-white/[0.02]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[800px] mx-auto"
          >
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)} className="font-bold text-[24px] md:text-[36px] text-white mb-8">
              {t.impactTitle}
            </motion.h2>

            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="space-y-6 text-secondary-white text-[16px] md:text-[18px] leading-relaxed">
              <p>{t.impactText1}</p>
              <p>{t.impactText2}</p>

              {/* Cálculo visual */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⛽</span>
                  <p className="text-white font-medium">{t.impactCalculation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚛</span>
                  <p className="text-white font-medium">{t.impactMultiply}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-white/80">{t.impactConclusion}</p>
                </div>
              </div>

              {/* Cálculo concreto */}
              <div className="p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl border border-red-500/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/50 text-sm">100 {t.impactFleetVehicleUnit} × 35,000 L</p>
                    <p className="text-white font-bold text-xl mt-1">3,500,000 L/{t.impactFleetPeriodUnit}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">× 8.5%</p>
                    <p className="text-red-400 font-bold text-xl mt-1">297,500 L</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">{t.impactWastedLabel}</p>
                    <p className="text-red-400 font-bold text-xl mt-1">💸</p>
                  </div>
                </div>
              </div>

              <p className="text-white font-bold text-xl text-center pt-4">
                {t.impactQuestion}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="2xl:max-w-[1280px] mx-auto"
          >
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src="/camion-neon.png"
                alt=""
                className="w-full h-[280px] sm:h-[320px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-black/70 flex flex-col items-center justify-center text-center px-6">
                <h3 className="text-white font-bold text-2xl md:text-4xl mb-4">
                  {t.ctaTitle}
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-[550px] mb-8">
                  {t.ctaSubtitle}
                </p>
                <Link
                  href="/#feedback"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold text-base md:text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 min-h-[48px] flex items-center active:scale-95"
                >
                  {t.ctaButton}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
