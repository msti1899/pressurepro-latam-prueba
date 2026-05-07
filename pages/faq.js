import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import { Navbar, Footer, WhatsAppButton, Breadcrumbs } from '../components';
import { getFAQsByLanguage } from '../constants/faq';
import { useLocale } from '../context/LocaleContext';
import { COUNTRIES } from '../config/countries';
import { buildAlternates, shouldNoIndexAlternateLanguage } from '../config/localization';
import { DEFAULT_LOCALE, getBaseUrl } from '../config/runtime';

export default function FAQPage() {
  const router = useRouter();
  const locale = router.locale || DEFAULT_LOCALE;
  const { translations, marketContent, language } = useLocale();
  const countryCode = COUNTRIES[locale] ? locale : null;

  const faqs = getFAQsByLanguage(language);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/faq`;
  const content = marketContent?.pages?.faq || {};
  const faqTranslations = translations?.faqPage || {};
  const alternates = buildAlternates(baseUrl, '/faq');
  const shouldNoIndex = shouldNoIndexAlternateLanguage(language, countryCode);

  // Structured Data - FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
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
        "name": content.main,
        "item": pageUrl
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.metaKeywords} />
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

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="PressurePro LATAM" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={content.metaTitle} />
        <meta name="twitter:description" content={content.metaDescription} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <div className="bg-primary-black tech-bg overflow-hidden min-h-screen">
        <Navbar />

        <div className="pt-[77px] sm:pt-[95px]">
          <Breadcrumbs items={[
            { label: translations?.faqPage?.home || translations?.navbar?.about, href: '/' },
            { label: translations?.faqPage?.breadcrumb, href: null }
          ]} />
        </div>

        {/* Header */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="2xl:max-w-[1280px] mx-auto text-center"
          >
            <motion.div variants={fadeIn('down', 'tween', 0.2, 0.5)}>
              <TypingText title={`| ${content.typingText || faqTranslations.breadcrumb}`} textStyles="text-center" />
            </motion.div>
            <motion.h1
              variants={fadeIn('up', 'tween', 0.3, 0.5)}
              className="font-bold text-[32px] sm:text-[40px] md:text-[56px] text-white leading-tight mt-4"
            >
              {content.main}
            </motion.h1>
            <motion.p
              variants={fadeIn('up', 'tween', 0.4, 0.5)}
              className="text-secondary-white text-base md:text-lg mt-4 max-w-[600px] mx-auto"
            >
              {content.subtitle}
            </motion.p>
          </motion.div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-12 md:py-20 px-6 sm:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="2xl:max-w-[900px] mx-auto"
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 'tween', index * 0.1, 0.5)}
                  className="bg-[#1A1A2E] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <h3 className="text-white font-semibold text-base md:text-lg pr-4 group-hover:text-purple-400 transition-colors">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-secondary-white text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>

                          {/* Keywords relacionadas */}
                          {faq.keywords && faq.keywords.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {faq.keywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-purple-950/50 p-8 md:p-12 text-center backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-white font-bold text-2xl md:text-4xl mb-4">
                {translations?.faqPage?.moreQuestions}
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-[600px] mx-auto mb-8">
                {translations?.faqPage?.moreQuestionsSubtitle}
              </p>
              <Link
                href="/#feedback"
                className="inline-block px-8 py-3 bg-purple-500 rounded-full text-white font-semibold text-base md:text-lg hover:bg-purple-600 transition-all shadow-lg shadow-purple-500/20 min-h-[48px] active:scale-95"
              >
                {translations?.faqPage?.contactNow}
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
