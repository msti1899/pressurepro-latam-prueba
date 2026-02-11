const http = require('http');

// Test deep content of one industry page
http.get('http://localhost:3099/es/industries/mineria', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('');
    
    // Check SEO tags
    const checks = [
      { name: 'Title', found: body.includes('Minería - PressurePro LATAM') },
      { name: 'Meta description', found: body.includes('meta name="description"') },
      { name: 'Canonical URL', found: body.includes('rel="canonical"') },
      { name: 'OG tags', found: body.includes('og:title') },
      { name: 'Twitter card', found: body.includes('twitter:card') },
      { name: 'Navbar', found: body.includes('Navbar') || body.includes('nav') || body.includes('pp-white') },
      { name: 'Footer', found: body.includes('footer') || body.includes('Footer') },
      { name: 'Industry image', found: body.includes('mineria.jpeg') },
      { name: 'Benefits section', found: body.includes('Eficiencia') || body.includes('benefit') },
      { name: 'CTA section', found: body.includes('feedback') || body.includes('Contactar') || body.includes('flota') },
      { name: 'Other industries nav', found: body.includes('agricultura') || body.includes('forestal') },
      { name: 'Back home link', found: body.includes('Volver al inicio') },
      { name: 'WhatsApp button', found: body.includes('WhatsApp') || body.includes('whatsapp') },
      { name: 'LanguageContext used', found: !body.includes('Cannot read properties of undefined') },
      { name: 'No hydration errors', found: !body.includes('Hydration failed') },
      { name: 'No runtime errors', found: !body.includes('Internal Server Error') && !body.includes('Application error') },
    ];
    
    console.log('=== Content Checks for /es/industries/mineria ===');
    let allPass = true;
    checks.forEach(c => {
      const icon = c.found ? '✓' : '✗';
      console.log(`  ${icon} ${c.name}`);
      if (!c.found) allPass = false;
    });
    
    console.log('');
    console.log(allPass ? '=== ALL CHECKS PASSED ===' : '=== SOME CHECKS FAILED ===');
    
    // Show body size
    console.log(`\nHTML size: ${(body.length / 1024).toFixed(1)} KB`);
  });
});
