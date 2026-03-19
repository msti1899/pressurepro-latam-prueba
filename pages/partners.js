import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, textVariant } from '../utils/motion';
import { TypingText, TitleText } from '../components/CustomTexts';
import { Navbar, Footer, WhatsAppButton, Breadcrumbs } from '../components';
import { useLocale } from '../context/LocaleContext';
import { buildAlternates, shouldNoIndexAlternateLanguage } from '../config/localization';
import { COUNTRIES } from '../config/countries';
import { INDUSTRIES, OEM_PARTNERS, ALL_OEM_PARTNERS } from '../constants/industries';
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
              className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-3xl border border-white/10 p-8 md:p-12 text-center"
            >
              <h3 className="text-white font-bold text-2xl md:text-4xl mb-4">
                {t.ctaTitle}
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-[500px] mx-auto mb-8">
                {t.ctaSubtitle}
              </p>
              <Link
                href="/#feedback"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold text-base md:text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 min-h-[48px] active:scale-95"
              >
                {translations?.footer?.contact}
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
