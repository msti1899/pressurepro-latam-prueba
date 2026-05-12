# 🚀 Guía de Optimización de Rendimiento

## Problema Detectado

Las imágenes en `/public/imagenes_reales/` están sin comprimir y son muy pesadas:
- **PressurePro on Doe Run Mining Truck.jpg**: 21.97 MB ⚠️
- **IMG_5527 - 1.jpg**: 11.48 MB ⚠️
- **IMG_1895.jpg**: 7.35 MB ⚠️

Esto causa carga lenta de la home en todos los países/idiomas.

---

## ✅ Optimizaciones Implementadas

### 1. **Componente DeviceShowcase**
- ✅ Cambiado de `<img>` a `<Image>` de Next.js
- ✅ Optimización automática a WebP/AVIF
- ✅ Lazy loading nativo
- ✅ Responsive images con `sizes`

### 2. **Dynamic Imports en Home**
- ✅ Code splitting por sección
- ✅ Carga lazy de componentes below-the-fold
- ✅ Loading skeletons para mejor UX

### 3. **Hero Optimizado**
- ✅ Reducida calidad de 85 a 75 (imperceptible)
- ✅ Placeholder blur para imágenes
- ✅ Priority solo en primera imagen

### 4. **next.config.js Mejorado**
- ✅ Soporte AVIF (mejor compresión que WebP)
- ✅ Cache headers agresivos (1 año)
- ✅ Cache TTL de 30 días para imágenes
- ✅ Compresión habilitada

### 5. **Script de Optimización de Imágenes**
- ✅ Compresión automática con Sharp
- ✅ Backup de originales
- ✅ Progressive JPEG + MozJPEG

### 6. **Animaciones Optimizadas** (siguiente paso)
- ⏳ Reducir animaciones simultáneas
- ⏳ `will-change` solo en elementos animados
- ⏳ Viewport observers optimizados

---

## 📋 Pasos para Ejecutar Optimizaciones

### **PASO 1: Instalar dependencias**
```bash
npm install --save-dev sharp
```

### **PASO 2: Optimizar imágenes pesadas**
```bash
node scripts/optimize-images.js
```

Este script:
- ✅ Redimensiona imágenes a máximo 1920px de ancho
- ✅ Comprime con calidad 85% (excelente balance)
- ✅ Convierte a Progressive JPEG (carga gradual)
- ✅ Hace backup automático en `/public/imagenes_reales/originals/`
- ⚠️ **CRÍTICO**: Reducirá ~70-80% del peso total

### **PASO 3: Verificar resultados**
```bash
npm run dev
```

Visita la home y verifica:
- ✅ Imágenes cargan más rápido
- ✅ Calidad visual sigue siendo excelente
- ✅ Smooth scrolling mejorado
- ✅ Animaciones más fluidas

---

## 📊 Resultados Esperados

### **Antes:**
- **First Load JS**: ~500-800 KB
- **Imágenes totales**: ~80 MB sin comprimir
- **LCP (Largest Contentful Paint)**: 4-6s ❌
- **CLS (Cumulative Layout Shift)**: 0.15-0.25 ⚠️

### **Después:**
- **First Load JS**: ~200-350 KB ✅
- **Imágenes totales**: ~15-20 MB (optimizadas) ✅
- **LCP**: 1.5-2.5s ✅
- **CLS**: <0.1 ✅

---

## 🔍 Verificación de Performance

### **Lighthouse Audit**
```bash
# En Chrome DevTools > Lighthouse
# Ejecutar audit para "Performance"
```

Métricas objetivo:
- **Performance Score**: >85 (actualmente probablemente <60)
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1

### **Webpagetest.org**
Probar desde diferentes ubicaciones LATAM:
- Santiago, Chile
- São Paulo, Brasil
- Ciudad de México, México

---

## 🎨 SEO Preservado

Todas las optimizaciones mantienen intacto el SEO:
- ✅ Metadatos y structured data sin cambios
- ✅ Hreflang tags funcionan igual
- ✅ Alt texts preservados
- ✅ URLs y routing sin modificación
- ✅ Contenido geo-targeted intacto

---

## ⚠️ Notas Importantes

1. **Backup Automático**: El script crea backup antes de optimizar
2. **Sin pérdida visual**: Calidad 85% es indistinguible del original
3. **Formatos modernos**: Next.js sirve AVIF/WebP automáticamente
4. **Archivos HEIC**: No soportados por navegadores (ya se ignoran)

---

## 🛠️ Troubleshooting

### "Sharp no está instalado"
```bash
npm install sharp --save-dev
```

### "Las imágenes se ven pixeladas"
Ajusta `QUALITY` en `scripts/optimize-images.js`:
- Actual: 85 (recomendado)
- Mayor calidad: 90 (más pesado)
- Menor calidad: 80 (más liviano)

### "Quiero restaurar originales"
```bash
# Copiar de backup
cp public/imagenes_reales/originals/* public/imagenes_reales/
```

---

## 📞 Soporte

Si tienes dudas o problemas con las optimizaciones, revisa:
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Última actualización**: Mayo 2026
**Versión**: 1.0
