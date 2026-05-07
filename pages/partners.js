import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn, textVariant } from '../utils/motion';
import { TypingText, TitleText } from '../components/CustomTexts';
import { Navbar, Footer, WhatsAppButton, Breadcrumbs } from '../components';
import { useLocale } from '../context/LocaleContext';
import { buildAlternates, shouldNoIndexAlternateLanguage } from '../config/localization';
import { COUNTRIES } from '../config/countries';
import { INDUSTRIES, OEM_PARTNERS, ALL_OEM_PARTNERS, ALL_TECH_PARTNERS } from '../constants/industries';
import { TECH_PARTNER_DETAILS } from '../constants/techPartners';
import { DEFAULT_LOCALE, getBaseUrl } from '../config/runtime';

export default function PartnersPage() {
  const router = useRouter();
  const { translations, language } = useLocale();
  const locale = router.locale || DEFAULT_LOCALE;
  const langBase = language;

  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/partners`;
  const countryCode = COUNTRIES[locale] ? locale : null;

  // Traducciones de la página
  const t = translations?.partners || {};
  const [selectedTechPartner, setSelectedTechPartner] = useState(null);

  // Precompute modal content (needed before AnimatePresence exit)
  const modalDetails = selectedTechPartner ? TECH_PARTNER_DETAILS[selectedTechPartner.name] : null;
  const modalLang = ['en', 'pt'].includes(langBase) ? langBase : 'es';
  const modalSubtitle = modalDetails?.subtitle[modalLang] || modalDetails?.subtitle?.en;
  const modalDescription = modalDetails?.description[modalLang] || modalDetails?.description?.en;

  const isMexico = locale === 'mx';
  const samsaraPartner = ALL_TECH_PARTNERS.find(p => p.name === 'Samsara');

  // Generar hreflang alternates
  const alternates = buildAlternates(baseUrl, '/partners');
  const shouldNoIndex = shouldNoIndexAlternateLanguage(language, countryCode);

  const seoTitle = t.seoTitle;
  const seoDescription = t.seoDescription;
  const seoKeywords = t.seoKeywords;
  const homeLabel = translations?.faqPage?.home || translations?.navbar?.about;

  // Mapeo de industrias con sus partners
  const industriesWithPartners = INDUSTRIES.filter(ind => ind.oems && ind.oems.length > 0).map(ind => {
    const content = ind[langBase] || ind.es;
    return {
      ...ind,
      localeName: content.name,
      localeMarketInfo: content.marketInfo,
    };
  });

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
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

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="PressurePro LATAM" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Head>

      <div className="bg-primary-black tech-bg overflow-hidden min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="relative w-full pt-[95px] sm:pt-[110px] pb-12 md:pb-20 px-6 sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-[77px] sm:top-[95px] left-0 w-full z-20">
            <Breadcrumbs items={[
              { label: homeLabel, href: '/' },
              { label: t.breadcrumb, href: null }
            ]} />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 2xl:max-w-[1280px] mx-auto pt-12 md:pt-16"
          >
            <motion.div variants={textVariant(0.3)}>
              <TypingText title={`| ${t.typingText}`} textStyles="text-center" />
            </motion.div>
            <motion.h1
              variants={textVariant(0.5)}
              className="font-bold text-[28px] sm:text-[36px] md:text-[48px] text-white leading-tight text-center max-w-[900px] mx-auto mt-4"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p
              variants={fadeIn('up', 'tween', 0.6, 1)}
              className="text-secondary-white text-base md:text-lg max-w-[700px] mx-auto text-center mt-6"
            >
              {t.heroSubtitle}
            </motion.p>
          </motion.div>
        </section>

        {/* Partners tecnológicos y estratégicos */}
        <section className="py-8 md:py-12 px-6 sm:px-16">
          <div className="2xl:max-w-[1280px] mx-auto">
            {/* Banner de integración destacada — solo México, animación propia */}
            <AnimatePresence>
              {isMexico && samsaraPartner && (
                <motion.button
                  key="samsara-banner"
                  type="button"
                  onClick={() => setSelectedTechPartner(samsaraPartner)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4 }}
                  className="w-full text-left cursor-pointer group mb-8"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-900/30 via-[#1a1830] to-purple-950/20 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-purple-400/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/15">
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full bg-purple-600/10 blur-2xl pointer-events-none" />
                    {samsaraPartner.logo && (
                      <div className="flex-shrink-0 w-36 h-16 flex items-center justify-center bg-white/[0.06] rounded-2xl border border-white/10 px-4">
                        <img
                          src={samsaraPartner.logo}
                          alt="Samsara"
                          className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-extrabold text-xl md:text-2xl leading-tight mb-2">
                        {t.samsaraBannerTitle || 'PressurePro + Samsara'}
                      </h3>
                      <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed max-w-2xl">
                        {t.samsaraBannerDesc || "Connect PressurePro tire telemetry directly to Samsara's Connected Operations platform. Monitor pressure and temperature in real time alongside all your fleet data."}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2 text-purple-300 group-hover:text-purple-200 font-semibold text-sm transition-colors whitespace-nowrap">
                      {t.samsaraBannerCta || 'View integration'}
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              {ALL_TECH_PARTNERS.map((partner, idx) => {
                const details = TECH_PARTNER_DETAILS[partner.name];
                const cardClass = 'group flex items-center justify-center p-0 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 h-[100px] md:h-[120px]';
                const logoEl = partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity m-0"
                  />
                ) : (
                  <span className="text-white font-bold text-sm text-center w-full">{partner.name}</span>
                );
                if (details) {
                  return (
                    <motion.button
                      key={partner.name}
                      type="button"
                      onClick={() => setSelectedTechPartner(partner)}
                      variants={fadeIn('up', 'spring', idx * 0.04, 0.6)}
                      className={`${cardClass} cursor-pointer`}
                    >
                      {logoEl}
                    </motion.button>
                  );
                }
                return (
                  <motion.a
                    key={partner.name}
                    href={partner.url !== '#' ? partner.url : undefined}
                    target={partner.url !== '#' ? '_blank' : undefined}
                    rel={partner.url !== '#' ? 'noopener noreferrer' : undefined}
                    variants={fadeIn('up', 'spring', idx * 0.04, 0.6)}
                    className={cardClass}
                  >
                    {logoEl}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          </div>
        </section>

        {/* Todos los partners OEM */}
        <section className="py-8 md:py-12 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="2xl:max-w-[1280px] mx-auto"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="text-center mb-12">
              <h2 className="font-bold text-[22px] sm:text-[28px] md:text-[36px] text-white mb-4">
                {t.allPartnersTitle}
              </h2>
              <p className="text-secondary-white text-base md:text-lg max-w-[600px] mx-auto">
                {t.allPartnersSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
              {ALL_OEM_PARTNERS.map((partner, idx) => (
                <motion.a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeIn('up', 'spring', idx * 0.05, 0.6)}
                  className="group flex items-center justify-center p-0 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 h-[140px] md:h-[180px]"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity m-0"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg md:text-xl text-center w-full">{partner.name}</span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Partners por industria */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="2xl:max-w-[1280px] mx-auto"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="text-center mb-16">
              <h2 className="font-bold text-[22px] sm:text-[28px] md:text-[36px] text-white mb-4">
                {t.byIndustryTitle}
              </h2>
              <p className="text-secondary-white text-base md:text-lg max-w-[600px] mx-auto">
                {t.byIndustrySubtitle}
              </p>
            </motion.div>

            <div className="space-y-16">
              {industriesWithPartners.map((ind, indIdx) => (
                <motion.div
                  key={ind.id}
                  variants={fadeIn('up', 'tween', indIdx * 0.1, 1)}
                  className="bg-white/[0.03] rounded-3xl border border-white/10 overflow-hidden"
                >
                  {/* Header de la industria */}
                  <div className="relative h-[120px] md:h-[160px] overflow-hidden">
                    <img
                      src={ind.imgUrl}
                      alt={ind.localeName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                    <div className="absolute inset-0 flex items-center px-6 md:px-10">
                      <div>
                        <h3 className="text-white font-bold text-[20px] md:text-[28px]">
                          {ind.localeName}
                        </h3>
                        <p className="text-white/70 text-sm md:text-base mt-1 max-w-[500px] line-clamp-2">
                          {ind.localeMarketInfo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Partners de esta industria */}
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {ind.oems.map((partner, pIdx) => (
                        <a
                          key={partner.name}
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center p-0 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 h-[70px] md:h-[90px]"
                        >
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity m-0"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm text-center w-full">{partner.name}</span>
                          )}
                        </a>
                      ))}
                    </div>

                    <div className="flex justify-end mt-4">
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                      >
                        {t.viewIndustry}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
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
              className="bg-gradient-to-r from-purple-900/30 to-purple-950/30 rounded-3xl border border-white/10 p-8 md:p-12 text-center"
            >
              <h3 className="text-white font-bold text-2xl md:text-4xl mb-4">
                {t.ctaTitle}
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-[500px] mx-auto mb-8">
                {t.ctaSubtitle}
              </p>
              <Link
                href="/#feedback"
                className="inline-flex items-center px-8 py-3 bg-purple-500 rounded-full text-white font-semibold text-base md:text-lg hover:bg-purple-600 transition-all shadow-lg shadow-purple-500/20 min-h-[48px] active:scale-95"
              >
                {translations?.footer?.contact}
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <Footer />

        {/* ── Modal de partner tecnológico ─────────────────────────── */}
        <AnimatePresence>
          {selectedTechPartner && modalDetails && (
            <motion.div
              key="tech-partner-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTechPartner(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25 }}
                className="bg-gradient-to-br from-[#0e1d2d] via-[#112030] to-[#132438] border border-white/15 rounded-3xl max-w-2xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Destello decorativo */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

                {/* Botón cerrar */}
                <button
                  onClick={() => setSelectedTechPartner(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all z-10"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-8 flex flex-col md:flex-row gap-8">
                  {/* Contenido izquierdo */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-extrabold text-2xl uppercase tracking-wide leading-tight pr-10">
                      {selectedTechPartner.name}
                    </h3>
                    <p className="text-purple-300 text-sm font-semibold mt-1 mb-4">{modalSubtitle}</p>
                    <div className="h-px bg-white/10 mb-5" />
                    <p className="text-white/90 text-[15px] leading-[1.8] font-light tracking-wide">{modalDescription}</p>
                    <a
                      href={modalDetails.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-6 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {modalDetails.website}
                    </a>
                  </div>

                  {/* Logo derecho */}
                  {selectedTechPartner.logo && (
                    <div className="flex-shrink-0 w-full md:w-52 flex items-center justify-center bg-white/[0.07] rounded-2xl border border-white/15 p-6 self-start">
                      <img
                        src={selectedTechPartner.logo}
                        alt={selectedTechPartner.name}
                        className="max-w-full max-h-28 object-contain filter brightness-0 invert"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <WhatsAppButton />
      </div>
    </>
  );
}
