/**
 * Script de Optimización de Imágenes
 * ====================================
 * 
 * Este script optimiza las imágenes pesadas en /public/imagenes_reales/
 * reduciendo su tamaño sin pérdida significativa de calidad.
 * 
 * USO:
 * npm install --save-dev sharp
 * node scripts/optimize-images.js
 * 
 * IMPORTANTE: Hace backup de las originales en /public/imagenes_reales/originals/
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'imagenes_reales');
const BACKUP_DIR = path.join(SOURCE_DIR, 'originals');
const MAX_WIDTH = 1920; // Ancho máximo para imágenes
const QUALITY = 85; // Calidad JPEG (85 es excelente balance)

// Crear directorio de backup si no existe
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log('✓ Directorio de backup creado:', BACKUP_DIR);
}

async function optimizeImage(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const backupPath = path.join(BACKUP_DIR, filename);
  const ext = path.extname(filename).toLowerCase();

  // Solo procesar imágenes JPEG/JPG
  if (!['.jpg', '.jpeg'].includes(ext)) {
    console.log(`⊘ Ignorando ${filename} (formato no soportado)`);
    return;
  }

  // Verificar si ya existe backup (evitar re-procesar)
  if (fs.existsSync(backupPath)) {
    console.log(`⊘ ${filename} ya fue optimizado previamente`);
    return;
  }

  try {
    const stats = fs.statSync(sourcePath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    // Hacer backup del original
    fs.copyFileSync(sourcePath, backupPath);

    // Optimizar imagen
    await sharp(sourcePath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({
        quality: QUALITY,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(sourcePath + '.tmp');

    // Reemplazar original con optimizada
    fs.renameSync(sourcePath + '.tmp', sourcePath);

    const newStats = fs.statSync(sourcePath);
    const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ ${filename}`);
    console.log(`  Original: ${originalSizeMB} MB → Optimizada: ${newSizeMB} MB (${savings}% reducción)`);
  } catch (error) {
    console.error(`✗ Error procesando ${filename}:`, error.message);
  }
}

async function main() {
  console.log('\n🖼️  OPTIMIZACIÓN DE IMÁGENES - PressurePro LATAM\n');
  console.log('Procesando imágenes en:', SOURCE_DIR);
  console.log('Configuración:');
  console.log(`  • Ancho máximo: ${MAX_WIDTH}px`);
  console.log(`  • Calidad JPEG: ${QUALITY}%`);
  console.log(`  • Backup en: ${BACKUP_DIR}\n`);

  const files = fs.readdirSync(SOURCE_DIR);
  const imageFiles = files.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  No se encontraron imágenes JPEG/JPG para optimizar');
    return;
  }

  console.log(`Encontradas ${imageFiles.length} imágenes para procesar...\n`);

  for (const file of imageFiles) {
    await optimizeImage(file);
  }

  console.log('\n✅ Optimización completada!');
  console.log('\nIMPORTANTE:');
  console.log('• Las imágenes originales están respaldadas en /public/imagenes_reales/originals/');
  console.log('• Verifica que las imágenes optimizadas se vean correctamente en tu sitio');
  console.log('• Si necesitas restaurar: copia desde /originals/ al directorio padre\n');
}

main().catch((error) => {
  console.error('Error fatal:', error);
  process.exit(1);
});
