const fs = require('fs');
let c = fs.readFileSync('d:/pressurepro-latam/config/countries.js', 'utf8');

const uyBlock = [
  '  uy: {',
  "    code: 'uy',",
  "    name: 'Uruguay',",
  "    language: 'es',",
  "    flag: 'https://flagcdn.com/uy.svg',",
  "    currency: 'UYU',",
  "    timezone: 'America/Montevideo',",
  "    hreflang: 'es-UY',",
  "    whatsapp: '+59899000000',",
  "    terminology: { tires: 'Neumáticos', truck: 'Camión', fleet: 'Flota' },",
  "    priorityIndustries: ['agriculture', 'transport', 'forestry'],",
  '    regionalClients: [],',
    "seoKeywords: ['monitoreo de neumáticos', 'TPMS Uruguay', 'presión de neumáticos']",
  '  },',
].join('\n');

if (!c.includes("uy: {")) {
  c = c.replace("  es: {\n    code: 'es',\n    name: 'Espa", uyBlock + "\n  es: {\n    code: 'es',\n    name: 'Espa");
}

c = c.replace("'UY': 'mx'", "'UY': 'uy'");

fs.writeFileSync('d:/pressurepro-latam/config/countries.js', c, 'utf8');
var s = fs.statSync('d:/pressurepro-latam/config/countries.js').size;
console.log('Written ' + s + ' bytes');

delete require.cache[require.resolve('./config/countries.js')];
var test = require('./config/countries.js');
console.log('Countries:', Object.keys(test.COUNTRIES));
console.log('UY mapping:', test.ISO_TO_COUNTRY['UY']);