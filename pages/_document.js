import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Documento base de Next.js con lang attribute dinámico para SEO internacional
 */
export default function Document(props) {
  // Determinar el idioma correcto según el locale de manera segura
  const locale = props.locale || (props.__NEXT_DATA__ && props.__NEXT_DATA__.locale) || 'es';
  
  // Mapeo de locales a códigos de idioma HTML correctos
  const langMap = {
    'es': 'es',
    'mx': 'es-MX',
    'ar': 'es-AR',
    'cl': 'es-CL',
    'pe': 'es-PE',
    'co': 'es-CO',
    'bo': 'es-BO',
    'uy': 'es-UY',
    'br': 'pt-BR',
    'pt': 'pt',
    'en': 'en',
  };
  
  const htmlLang = langMap[locale] || 'es';
  
  return (
    <Html lang={htmlLang}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b0764" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
        <link rel="preconnect" href="https://flagcdn.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
