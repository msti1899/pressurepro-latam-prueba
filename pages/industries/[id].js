import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, textVariant } from '../../utils/motion';
import { TypingText, TitleText } from '../../components/CustomTexts';
import { Navbar, Footer, WhatsAppButton, Breadcrumbs } from '../../components';
import { useLocale } from '../../context/LocaleContext';
import { COUNTRIES } from '../../config/countries';
import { buildAlternates, shouldNoIndexAlternateLanguage } from '../../config/localization';
import { DEFAULT_LOCALE, DEFAULT_OG_LOCALE, getBaseUrl } from '../../config/runtime';
import {
  INDUSTRIES,
  INDUSTRY_BY_SLUG,
  INDUSTRY_BY_ID,
  ID_TO_SLUG,
  SLUG_MAP,
  INDUSTRY_SLUGS,
  getIndustryContent,
  OEM_PARTNERS
} from '../../constants/industries';

export default function IndustryPage() {
  const router = useRouter();
  const { id } = router.query;
  const { translations, language, countryConfig } = useLocale();
  const locale = router.locale || DEFAULT_LOCALE;

  // Resolver industria desde el archivo centralizado
  const result = getIndustryContent(id, language);
  const industry = result?.industry;
  const content = result?.content;

  // Scroll al top cuando cambia la industria (navegación client-side)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!industry || !content) {
    return (
      <div className="bg-primary-black min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white pt-[95px]">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-secondary-white mb-8">{translations?.industryPage?.notFound}</p>
          <Link href="/" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
            {translations?.industryPage?.backToHome}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const industryName = content.name;
  const marketInfo = content.marketInfo;
  const pageTitle = content.pageTitle;
  const description = content.description;
  const additional = content.additional;
  const industryPageText = translations?.industryPage || {};
  const partnersText = translations?.partners || {};
  const homeLabel = translations?.faqPage?.home || translations?.navbar?.about;
  const marketsLabel = translations?.explore?.title;

  const formatTemplate = (template, values) => {
    if (!template) return '';
    return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
  };

  // Generar H1 dinámico con geo-targeting por país
  const generateH1 = () => formatTemplate(industryPageText.h1Template, {
    industry: industryName,
    country: countryConfig?.name,
    tireTerm: countryConfig?.terminology?.tires,
  });

  const dynamicH1 = generateH1();

  const baseUrl = getBaseUrl();
  const slug = industry.slug;
  const pageUrl = `${baseUrl}/${locale}/industries/${slug}`;
  const pagePath = `/industries/${slug}`;
  const countryCode = COUNTRIES[locale] ? locale : null;

  // Generar hreflang alternates para todas las versiones de esta página
  const alternates = buildAlternates(baseUrl, pagePath);
  const shouldNoIndex = shouldNoIndexAlternateLanguage(language, countryCode);

  // Determinar idioma para og:locale
  const langBase = language;
  const ogLocaleMap = { es: 'es_LA', en: 'en_US', pt: 'pt_BR' };
  const ogLocale = COUNTRIES[locale]?.hreflang?.replace('-', '_') || ogLocaleMap[langBase] || DEFAULT_OG_LOCALE;

  const seoTitle = formatTemplate(industryPageText.seoTitleTemplate, {
    industry: industryName,
  });
  const seoDescription = marketInfo || formatTemplate(industryPageText.seoDescriptionTemplate, {
    industry: industryName,
  });
  const seoKeywords = formatTemplate(industryPageText.seoKeywordsTemplate, {
    industry: industryName,
    slug,
  });
  const seoImage = `${baseUrl}${industry.imgUrl}`;

  // Structured Data - BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "PressurePro LATAM",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": marketsLabel,
        "item": `${baseUrl}/${locale}#mercados`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": industryName,
        "item": pageUrl
      }
    ]
  };

  // Structured Data - Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `PressurePro TPMS - ${industryName}`,
    "description": seoDescription,
    "provider": {
      "@type": "Organization",
      "name": "PressurePro LATAM",
      "url": baseUrl
    },
    "areaServed": Object.values(COUNTRIES).map(c => ({
      "@type": "Country",
      "name": c.name
    })),
    "serviceType": "Tire Pressure Monitoring System",
    "image": seoImage
  };

  // Otras industrias para la navegación
  const otherIndustries = INDUSTRIES.filter(ind => ind.id !== industry.id);

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

        {/* Hreflang alternates */}
        {alternates.map(({ hreflang, href }) => (
          <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
        ))}

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:site_name" content="PressurePro LATAM" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        {/* Geo tags */}
        {COUNTRIES[locale] && (
          <>
            <meta name="geo.region" content={locale.toUpperCase()} />
            <meta name="geo.placename" content={COUNTRIES[locale].name} />
          </>
        )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </Head>

      <div className="bg-primary-black tech-bg overflow-hidden min-h-screen">
        <Navbar />

        {/* Breadcrumbs para navegación y SEO */}
        {/* Hero de la industria */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] pt-[77px] sm:pt-[95px]">
          <div className="absolute inset-0">
            <img
              src={industry.imgUrl}
              alt={industryName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-black/60 to-black/30" />
          </div>

          {/* Breadcrumbs para navegación y SEO - Posicionamiento absoluto bajo el navbar */}
          <div className="absolute top-[77px] sm:top-[95px] left-0 w-full z-20">
            <Breadcrumbs items={[
              { label: homeLabel, href: '/' },
              { label: marketsLabel, href: '/#mercados' },
              { label: industryName, href: null }
            ]} />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16 px-6 sm:px-16 2xl:max-w-[1280px] mx-auto"
          >
            <motion.div variants={textVariant(0.3)}>
              <TypingText title={`| ${marketsLabel}`} textStyles="" />
            </motion.div>
            <motion.h1
              variants={textVariant(0.5)}
              className="font-bold text-[26px] sm:text-[32px] md:text-[42px] lg:text-[48px] text-white leading-tight mt-2 max-w-[900px]"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              {dynamicH1}
            </motion.h1>
            <motion.p
              variants={textVariant(0.7)}
              className="text-secondary-white text-base md:text-lg max-w-[600px] mt-4"
            >
              {marketInfo}
            </motion.p>
          </motion.div>
        </section>

        {/* Contenido principal */}
        {/* Contenido principal */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[1280px] mx-auto"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
              <h2 className="font-bold text-[24px] sm:text-[28px] md:text-[38px] text-white mb-8">
                {pageTitle}
              </h2>
            </motion.div>

            {content.structuredContent ? (
              <div className="space-y-16">
                {/* Section 1: Problems & Solution */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <motion.div variants={fadeIn('right', 'tween', 0.3, 1)} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-white font-semibold text-[20px] md:text-[24px] mb-4 text-red-400">
                      {content.structuredContent.problems.title}
                    </h3>
                    <ul className="space-y-3">
                      {content.structuredContent.problems.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-secondary-white">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeIn('left', 'tween', 0.3, 1)} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-white font-semibold text-[20px] md:text-[24px] mb-4 text-purple-400">
                      {content.structuredContent.solution.title}
                    </h3>
                    <p className="text-secondary-white text-[16px] leading-relaxed">
                      {content.structuredContent.solution.text}
                    </p>
                  </motion.div>
                </div>

                {/* Section 2: Features & Equipment */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <motion.div variants={fadeIn('up', 'tween', 0.4, 1)}>
                    <h3 className="text-white font-semibold text-[20px] md:text-[24px] mb-6 border-b border-white/10 pb-2">
                      {content.structuredContent.features.title}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {content.structuredContent.features.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="text-secondary-white text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn('up', 'tween', 0.5, 1)}>
                    <h3 className="text-white font-semibold text-[20px] md:text-[24px] mb-6 border-b border-white/10 pb-2">
                      {content.structuredContent.equipment.title}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {content.structuredContent.equipment.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-cyan-500" />
                          <span className="text-secondary-white text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Section 3: Benefits */}
                <motion.div variants={fadeIn('up', 'tween', 0.6, 1)} className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 rounded-3xl border border-white/10">
                  <h3 className="text-center text-white font-bold text-[24px] mb-8">
                    {content.structuredContent.benefits.title}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {content.structuredContent.benefits.items.map((item, idx) => (
                      <div key={idx} className="text-center p-4 bg-black/20 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="block text-green-400 font-bold text-xl mb-2">✓</span>
                        <span className="text-white font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              // Fallback for industries without structuredContent
              <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
                <motion.div variants={fadeIn('right', 'tween', 0.3, 1)}>
                  <h3 className="text-white font-semibold text-[18px] md:text-[22px] mb-4">
                    {translations?.industryPage?.specializedSolutions}
                  </h3>
                  <p className="text-secondary-white text-[15px] md:text-[17px] leading-relaxed">
                    {description}
                  </p>
                </motion.div>
                <motion.div variants={fadeIn('left', 'tween', 0.4, 1)}>
                  <h3 className="text-white font-semibold text-[20px] md:text-[24px] mb-4">
                    {translations?.industryPage?.keyBenefits}
                  </h3>
                  <p className="text-secondary-white text-base md:text-lg leading-relaxed">
                    {additional}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </section>

        {/* OEM Partners de esta industria */}
        {industry.oems && industry.oems.length > 0 && (
          <section className="py-12 md:py-20 px-6 sm:px-16 bg-gradient-to-b from-transparent to-black/10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="2xl:max-w-[1280px] mx-auto"
            >
              <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="text-center mb-12">
                <h2 className="font-bold text-[24px] sm:text-[28px] md:text-[38px] text-white mb-4">
                  {translations?.partners?.oemPartnersTitle}
                </h2>
                <p className="text-secondary-white text-base md:text-lg max-w-[700px] mx-auto">
                  {formatTemplate(partnersText.oemIndustrySubtitle, {
                    industry: industryName,
                  })}
                </p>
              </motion.div>

              <div
                className={`grid gap-2 ${
                  industry.oems.length === 1
                    ? 'grid-cols-1 justify-items-center'
                    : industry.oems.length === 2
                    ? 'grid-cols-2 justify-items-center'
                    : industry.oems.length === 3
                    ? 'grid-cols-3 justify-items-center'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                }`}
              >
                {industry.oems.map((partner, idx) => (
                  <motion.a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeIn('up', 'spring', idx * 0.1, 0.8)}
                    className="group flex items-center justify-center p-0 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-[140px] md:h-[180px]"
                  >
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity m-0 p-0"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg md:text-xl text-center w-full">{partner.name}</span>
                    )}
                  </motion.a>
                ))}
              </div>

              <motion.div variants={fadeIn('up', 'tween', 0.5, 1)} className="flex justify-center mt-8">
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 text-sm hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-all"
                >
                  {translations?.partners?.viewAllPartners}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </section>
        )}

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
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src={industry.secondaryImgUrl || industry.imgUrl}
                alt=""
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-indigo-900/70 to-black/60 flex flex-col items-center justify-center text-center px-6">
                <h3 className="text-white font-bold text-2xl md:text-4xl mb-4">
                  {translations?.industryPage?.readyToOptimize}
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-[500px] mb-8">
                  {translations?.industryPage?.contactForSolution}
                </p>
                <Link
                  href="/#feedback"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold text-base md:text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 min-h-[48px] flex items-center active:scale-95"
                >
                  {translations?.footer?.contact}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Otras industrias */}
        <section className="py-12 md:py-20 px-6 sm:px-16 bg-gradient-to-b from-transparent to-black/20">
          <div className="2xl:max-w-[1280px] mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={textVariant(0.2)}
                className="font-bold text-[24px] sm:text-[32px] md:text-[42px] text-white text-center mb-3"
              >
                {translations?.industryPage?.relatedIndustries}
              </motion.h2>
              <motion.p
                variants={textVariant(0.3)}
                className="text-secondary-white text-center text-base md:text-lg mt-4 max-w-[800px] mx-auto mb-12"
              >
                {translations?.industryPage?.relatedSubtitle}
              </motion.p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {otherIndustries.map((ind, idx) => {
                  const otherLang = COUNTRIES[locale]?.language || locale;
                  const otherContent = ind[otherLang] || ind.es;
                  return (
                    <motion.div
                      key={ind.id}
                      variants={fadeIn('up', 'spring', idx * 0.1, 0.8)}
                    >
                      <Link
                        href={`/industries/${ind.slug}`}
                        scroll={true}
                        className="group block relative h-[180px] sm:h-[200px] md:h-[240px] rounded-2xl overflow-hidden active:scale-[0.97] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
                        aria-label={formatTemplate(industryPageText.relatedCardAriaLabel, { industry: otherContent.name })}
                      >
                        <img
                          src={ind.imgUrl}
                          alt={formatTemplate(industryPageText.relatedCardAltTemplate, { industry: otherContent.name })}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm md:text-base group-hover:text-purple-300 transition-colors">
                            {otherContent.name}
                          </h3>
                          <p className="text-white/60 text-xs mt-1 line-clamp-2">
                            {otherContent.marketInfo}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Volver al inicio */}
              <motion.div
                variants={fadeIn('up', 'tween', 0.5, 1)}
                className="flex justify-center mt-12"
              >
                <Link
                  href="/"
                  className="px-8 py-3 rounded-full border-2 border-white/20 text-white/80 text-sm hover:bg-white/10 hover:text-white hover:border-white/40 transition-all min-h-[44px] flex items-center gap-2 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {translations?.industryPage?.backToHome}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

// Generar rutas estáticas para todas las industrias
export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    for (const slug of INDUSTRY_SLUGS) {
      paths.push({ params: { id: slug }, locale });
    }
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      industryId: params.id,
    },
  };
}