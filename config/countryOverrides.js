/**
 * Overrides de contenido por país
 * 
 * Cada país puede sobreescribir cualquier texto de las traducciones base.
 * Solo hay que poner las claves que cambian — el resto se hereda del idioma.
 * 
 * Estructura: igual que locales/es/translations.js pero solo con lo que cambia.
 * 
 * Ejemplo: si Argentina tiene un hero.subtitle diferente:
 *   ar: { hero: { subtitle: "Texto distinto para Argentina" } }
 * 
 * Todo lo que NO esté acá se toma de la traducción base del idioma (es/en/pt).
 */

const countryOverrides = {
  // ─────────────────────────────────────────────
  // MÉXICO
  // ─────────────────────────────────────────────
  mx: {
    hero: {
      subtitle: 'Monitoreo de llantas en tiempo real para México',
    },
    about: {
      text: 'PressurePro LATAM lleva tecnología de punta en monitoreo de llantas a México. Desde el transporte de carga hasta la industria minera, nuestras soluciones ayudan a las flotillas mexicanas a reducir costos operativos y mejorar la seguridad vial en carreteras federales y autopistas.',
    },
    world: {
      description: 'Representantes oficiales en México. Soluciones de monitoreo de llantas para la industria del transporte, minería e industria mexicana.',
    },
  },

  // ─────────────────────────────────────────────
  // ARGENTINA
  // ─────────────────────────────────────────────
  ar: {
    hero: {
      subtitle: 'Monitoreo de neumáticos en tiempo real para Argentina',
    },
    about: {
      text: 'PressurePro LATAM trae al mercado argentino la tecnología líder en monitoreo de neumáticos. Nuestras soluciones están diseñadas para las exigencias del agro pampeano, el transporte de larga distancia por rutas nacionales y la minería en la cordillera, optimizando la vida útil de neumáticos y reduciendo costos de flota.',
    },
    world: {
      description: 'Presencia en Argentina con soluciones para el agro, transporte de carga y minería cordillerana.',
    },
  },

  // ─────────────────────────────────────────────
  // BRASIL
  // ─────────────────────────────────────────────
  br: {
    hero: {
      subtitle: 'Monitoramento de pneus em tempo real para o Brasil',
    },
    about: {
      text: 'A PressurePro LATAM oferece ao mercado brasileiro tecnologia líder em monitoramento de pneus. Nossas soluções atendem às demandas do agronegócio, do transporte rodoviário de cargas e da mineração, otimizando a vida útil dos pneus e reduzindo custos operacionais em todo o território nacional.',
    },
    world: {
      description: 'Presença no Brasil com soluções para agronegócio, transporte rodoviário e mineração.',
    },
  },

  // ─────────────────────────────────────────────
  // PERÚ
  // ─────────────────────────────────────────────
  pe: {
    hero: {
      subtitle: 'Monitoreo de neumáticos en tiempo real para Perú',
    },
    about: {
      text: 'PressurePro LATAM ofrece al mercado peruano soluciones avanzadas de monitoreo de neumáticos. Con la minería como motor económico del país, nuestros sistemas están optimizados para las exigencias de las operaciones en altura, el transporte por la Panamericana y la agroindustria costera.',
    },
    world: {
      description: 'Presencia en Perú con soluciones especializadas para minería de altura, transporte y agroindustria.',
    },
  },

  // ─────────────────────────────────────────────
  // CHILE
  // ─────────────────────────────────────────────
  cl: {
    hero: {
      subtitle: 'Monitoreo de neumáticos en tiempo real para Chile',
    },
    about: {
      text: 'PressurePro LATAM lleva al mercado chileno la tecnología más avanzada en monitoreo de neumáticos. Chile, líder mundial en minería del cobre, exige los más altos estándares de seguridad y eficiencia. Nuestros sistemas están diseñados para faenas mineras, el sector forestal del sur y el transporte a lo largo del territorio.',
    },
    world: {
      description: 'Presencia en Chile con soluciones para la gran minería del cobre, industria forestal y transporte.',
    },
  },

  // ─────────────────────────────────────────────
  // COLOMBIA
  // ─────────────────────────────────────────────
  co: {
    hero: {
      subtitle: 'Monitoreo de llantas en tiempo real para Colombia',
    },
    about: {
      text: 'PressurePro LATAM llega a Colombia con soluciones de monitoreo de llantas de clase mundial. Nuestros sistemas están adaptados para el transporte de carga por carreteras colombianas, las operaciones mineras y la actividad portuaria en Buenaventura, Cartagena y Barranquilla.',
    },
    world: {
      description: 'Presencia en Colombia con soluciones para transporte de carga, minería y operaciones portuarias.',
    },
  },

  // ─────────────────────────────────────────────
  // BOLIVIA
  // ─────────────────────────────────────────────
  bo: {
    hero: {
      subtitle: 'Monitoreo de neumáticos en tiempo real para Bolivia',
    },
    about: {
      text: 'PressurePro LATAM ofrece a Bolivia tecnología de vanguardia en monitoreo de neumáticos. Nuestras soluciones están diseñadas para las condiciones únicas del altiplano boliviano, las operaciones mineras en Potosí y Oruro, y el transporte de carga entre ciudades a gran altitud.',
    },
    world: {
      description: 'Presencia en Bolivia con soluciones para minería de altura, transporte altiplánico y agricultura.',
    },
  },

  // ─────────────────────────────────────────────
  // URUGUAY
  // ─────────────────────────────────────────────
  uy: {
    hero: {
      subtitle: 'Monitoreo de neumáticos en tiempo real para Uruguay',
    },
    about: {
      text: 'PressurePro LATAM, con sede en Uruguay, es el distribuidor exclusivo para América Latina. Nuestras soluciones están pensadas para el agro uruguayo, el transporte de cargas por rutas nacionales y la industria forestal, pilares de la economía del país.',
    },
    world: {
      description: 'Sede central de PressurePro LATAM. Soluciones para el agro, transporte y sector forestal uruguayo.',
    },
  },

  // ─────────────────────────────────────────────
  // ESPAÑA
  // ─────────────────────────────────────────────
  es: {
    hero: {
      subtitle: 'Monitorización de neumáticos en tiempo real para España',
    },
    about: {
      text: 'PressurePro LATAM extiende su presencia a España con tecnología líder en monitorización de neumáticos. Nuestros sistemas están adaptados para el transporte por carretera en la Península Ibérica, las operaciones industriales y la actividad portuaria en los principales puertos españoles.',
    },
    world: {
      description: 'Presencia en España con soluciones para transporte por carretera, industria y operaciones portuarias.',
    },
  },
};

export default countryOverrides;
