const http = require('http');

const urls = [
  '/es/industries/mineria',
  '/es/industries/agricultura',
  '/en/industries/forestal',
  '/mx/industries/transporte',
  '/pt/industries/portuario',
  '/es/industries/industrial',
  '/industries/mineria',       // sin locale
  '/es/industries/fake-slug',  // slug inválido
];

let i = 0;
function test() {
  if (i >= urls.length) {
    console.log('\n=== DONE ===');
    process.exit(0);
    return;
  }
  const url = urls[i];
  http.get('http://localhost:3099' + url, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
      const hasRuntimeError = body.includes('Internal Server Error') || body.includes('Application error');
      const titleMatch = body.match(/<title>(.*?)<\/title>/);
      const status = res.statusCode;
      let result = `${url} -> ${status}`;
      if (hasRuntimeError) result += ' [RUNTIME ERROR]';
      else if (status === 200) result += ' OK';
      else if (status === 404) result += ' NOT FOUND';
      else if (status >= 300 && status < 400) result += ` REDIRECT -> ${res.headers.location}`;
      if (titleMatch) result += ` | title="${titleMatch[1]}"`;
      console.log(result);
      i++;
      test();
    });
  }).on('error', e => {
    console.log(`${url} -> FETCH ERROR: ${e.message}`);
    i++;
    test();
  });
}

test();
