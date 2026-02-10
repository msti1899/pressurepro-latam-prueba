import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { LocaleProvider } from '../context/LocaleContext';
import { COUNTRIES, LANGUAGES } from '../config/countries';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const locale = router.locale || 'es';
  
  // Determinar si es un país o un idioma
  const isCountry = COUNTRIES && COUNTRIES[locale];
  const language = isCountry ? COUNTRIES[locale].language : (LANGUAGES && LANGUAGES[locale] ? locale : 'es');
  const country = isCountry ? locale : null;

  return (
    <>
      <LocaleProvider initialLanguage={language} initialCountry={country}>
        <Head>
          <title>PressurePro Latam</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Monitoreo en tiempo real de la presión y temperatura de los neumáticos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MF30HWVQGJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MF30HWVQGJ');
          `}
        </Script>
        
        <Component {...pageProps} />
      </LocaleProvider>
    </>
  );
};

export default MyApp;