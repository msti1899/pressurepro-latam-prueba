import Head from 'next/head';
import '../styles/globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }) => (
  <>
    <LanguageProvider>
      <Head>
        <title>PressurePro Latam</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Monitoreo en tiempo real de la presión y temperatura de los neumáticos" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
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
    </LanguageProvider>
  </>
);

export default MyApp;