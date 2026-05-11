# Fórmulas ROI Corregidas - PressurePro LATAM

## ✅ CAMBIOS IMPLEMENTADOS

**ANTES:** `tiresPerYear` era un valor fijo que NO se escalaba con el tamaño de la flota
**AHORA:** `tiresPerYear` se escala proporcionalmente según la cantidad real de neumáticos en la flota

**Variables mantenidas:** Todas las originales (tiresPerYear, mTiresPerYear, tireCost, etc.)

---

## 📊 CALCULADORA DE TRANSPORTE - FÓRMULAS NUEVAS

### Variables de Entrada

| Variable | Valor Default |
|----------|---------------|
| `simpleTrucks` | 10 |
| `simpleWheels` | 6 |
| `trailerTrucks` | 5 |
| `trailerWheels` | 8 |
| `kmPerYear` | 120,000 km |
| `fuelPricePerLiter` | $1.20/L |
| `pressureDiffPct` | 10% |
| `tireCost` | $400 |
| `tiresPerYear` | 30 ← SE MANTIENE |
| `equipmentCostPerTruck` | $500 |
| `sensorCostPerWheel` | $60 |

**Neumáticos en flota default:** 10×6 + 5×8 = 100 neumáticos

### Fórmula de Ahorro en Neumáticos (Corregida)

```javascript
// 1. % de degradación por presión incorrecta
tireDegradationPct = pressureDiffPct × 1.5

// 2. Calcular tamaño de flota default (referencia)
defaultTotalTires = (DEFAULTS.simpleTrucks × DEFAULTS.simpleWheels) +
                    (DEFAULTS.trailerTrucks × DEFAULTS.trailerWheels)
                  = (10 × 6) + (5 × 8)
                  = 100 neumáticos

// 3. Escalar tiresPerYear proporcionalmente al tamaño real de la flota
scaledTiresPerYear = tiresPerYear × (totalTires / defaultTotalTires)

// 4. Ahorro en neumáticos: con TPMS se evita la degradación
tireSaving = scaledTiresPerYear × tireCost × (tireDegradationPct / 100)
```

**Interpretación:** Si configuraste `tiresPerYear = 30` para una flota de 100 neumáticos (default), 
al aumentar a 660 neumáticos, el cálculo escala a `30 × (660/100) = 198 neumáticos/año`.

---

## 📋 EJEMPLO NUMÉRICO 1 - TRANSPORTE (Base)

### Configuración:
- **10 camiones** × 6 ruedas = 60 neumáticos
- **5 trailers** × 8 ruedas = 40 neumáticos
- **Total: 100 neumáticos**
- 120,000 km/año por camión
- Déficit de presión: 10%
- Neumáticos comprados/año (input): 30
- Costo neumático: $400

### Cálculos:

```
┌─────────────────────────────────────────────────────────┐
│ 1. DEGRADACIÓN POR PRESIÓN INCORRECTA                   │
├─────────────────────────────────────────────────────────┤
│ tireDegradationPct = 10% × 1.5 = 15%                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. TAMAÑO DE FLOTA DEFAULT (REFERENCIA)                 │
├─────────────────────────────────────────────────────────┤
│ defaultTotalTires = (10 × 6) + (5 × 8)                  │
│                   = 60 + 40                             │
│                   = 100 neumáticos                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. ESCALAR NEUMATICOS POR AÑO                           │
├─────────────────────────────────────────────────────────┤
│ scaledTiresPerYear = 30 × (100 / 100)                   │
│                    = 30 × 1.0                           │
│                    = 30 neumáticos/año                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. AHORRO EN NEUMÁTICOS                                 │
├─────────────────────────────────────────────────────────┤
│ tireSaving = 30 × $400 × 15%                            │
│            = 30 × $400 × 0.15                           │
│            = $1,800/año                                 │
└─────────────────────────────────────────────────────────┘

┌═════════════════════════════════════════════════════════┐
║ RESUMEN - ESCENARIO BASE (100 NEUMÁTICOS)              ║
╠═════════════════════════════════════════════════════════╣
║ a) Inversión inicial                                   ║
║    - Equipamiento: 15 veh × $500 = $7,500              ║
║    - Sensores: 100 neum × $60 = $6,000                 ║
║    - TOTAL: $13,500                                    ║
║                                                         ║
║ b) Ahorro combustible anual: $14,083                   ║
║                                                         ║
║ c) Ahorro neumáticos anual: $1,800                     ║
║                                                         ║
║ e) AHORRO TOTAL: $15,883/año                           ║
║                                                         ║
║ Recuperación: 13,500 ÷ 15,883 × 12 = 11 meses         ║
╚═════════════════════════════════════════════════════════╝
```

---

## 📋 EJEMPLO NUMÉRICO 2 - TRANSPORTE (Flota Grande)

### Configuración:
- **10 camiones** × 6 ruedas = 60 neumáticos
- **50 trailers** × 12 ruedas = 600 neumáticos ← CAMBIÓ
- **Total: 660 neumáticos** ← CAMBIÓ
- 120,000 km/año por camión
- Déficit de presión: 10%
- Neumáticos comprados/año (input): 30 (mismo valor)
- Costo neumático: $400

### Cálculos:

```
┌─────────────────────────────────────────────────────────┐
│ 1. DEGRADACIÓN (igual que antes)                        │
├─────────────────────────────────────────────────────────┤
│ tireDegradationPct = 10% × 1.5 = 15%                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. TAMAÑO DE FLOTA DEFAULT (REFERENCIA)                 │
├─────────────────────────────────────────────────────────┤
│ defaultTotalTires = 100 neumáticos (IGUAL)              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. ESCALAR NEUMATICOS POR AÑO                           │
├─────────────────────────────────────────────────────────┤
│ scaledTiresPerYear = 30 × (660 / 100)                   │
│                    = 30 × 6.6                           │
│                    = 198 neumáticos/año  ← CAMBIÓ       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. AHORRO EN NEUMÁTICOS                                 │
├─────────────────────────────────────────────────────────┤
│ tireSaving = 198 × $400 × 15%                           │
│            = 198 × $400 × 0.15                          │
│            = $11,880/año         ← CAMBIÓ               │
└─────────────────────────────────────────────────────────┘

┌═════════════════════════════════════════════════════════┐
║ RESUMEN - FLOTA GRANDE (660 NEUMÁTICOS)                ║
╠═════════════════════════════════════════════════════════╣
║ a) Inversión inicial                                   ║
║    - Equipamiento: 60 veh × $500 = $30,000             ║
║    - Sensores: 660 neum × $60 = $39,600                ║
║    - TOTAL: $69,600                                    ║
║                                                         ║
║ b) Ahorro combustible anual: $14,083                   ║
║                                                         ║
║ c) Ahorro neumáticos anual: $11,880  ← CAMBIÓ          ║
║                                                         ║
║ e) AHORRO TOTAL: $25,963/año  ← CAMBIÓ                 ║
║                                                         ║
║ Recuperación: 69,600 ÷ 25,963 × 12 = 33 meses         ║
╚═════════════════════════════════════════════════════════╝
```

### ✅ Comparación de Resultados

| Métrica | 100 Neumáticos | 660 Neumáticos | Cambio |
|---------|----------------|----------------|--------|
| Inversión | $13,500 | $69,600 | +416% |
| Ahorro Neumáticos | $1,800 | $11,880 | **+560%** ✅ |
| Ahorro Total | $15,883 | $25,963 | **+64%** ✅ |
| Recuperación | 11 meses | 33 meses | Aumentó |

**✅ CORRECTO:** El ahorro SÍ aumenta proporcionalmente (6.6x más neumáticos → 6.6x más ahorro).

---

## 🏗️ CALCULADORA MINERA - FÓRMULAS NUEVAS

### Variables de Entrada

| Variable | Valor Default |
|----------|---------------|
| `mVehicles` | 8 |
| `mVehicleType` | 'haul' (Haul Truck) |
| `mWheels` | 6 (varía según tipo) |
| `mHoursPerYear` | 5,000 h |
| `mFuelLPH` | 20 L/h |
| `mFuelPrice` | $1.20/L |
| `mPressureDiff` | 10% |
| `mTireCost` | $3,000 |
| `mDowntimeCost` | $10,000 |
| `mDowntimeEvents` | 4 |
| `mTiresPerYear` | 20 ← SE MANTIENE |

**Neumáticos en flota default:** 8 vehículos × 4 ruedas = 32 neumáticos

### Fórmula de Ahorro en Neumáticos (Corregida)

```javascript
// 1. % de degradación por presión incorrecta
mTireDegradation = mPressureDiff × 1.5

// 2. Calcular tamaño de flota default (referencia)
defaultMiningTires = MINING_DEFAULTS.vehicles × MINING_DEFAULTS.wheelsPerVehicle
                   = 8 × 4
                   = 32 neumáticos

// 3. Escalar mTiresPerYear proporcionalmente al tamaño real de la flota
scaledMTiresPerYear = mTiresPerYear × (totalTires / defaultMiningTires)

// 4. Ahorro en neumáticos: con TPMS se evita la degradación
tireSaving = scaledMTiresPerYear × mTireCost × (mTireDegradation / 100)
```

**Interpretación:** Si configuraste `mTiresPerYear = 20` para una flota de 32 neumáticos (default), 
al aumentar a 128 neumáticos (RTG 16 ruedas), el cálculo escala a `20 × (128/32) = 80 neumáticos/año`.

---

## 📋 EJEMPLO NUMÉRICO 3 - MINERA (Haul Trucks)

### Configuración:
- **8 Haul Trucks** × 6 ruedas = **48 neumáticos**
- 5,000 horas/año por vehículo
- Déficit de presión: 10%
- Neumáticos comprados/año (input): 20
- Costo neumático OTR: $3,000

### Cálculos:

```
┌─────────────────────────────────────────────────────────┐
│ 1. DEGRADACIÓN POR PRESIÓN INCORRECTA                   │
├─────────────────────────────────────────────────────────┤
│ mTireDegradation = 10% × 1.5 = 15%                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. TAMAÑO DE FLOTA DEFAULT (REFERENCIA)                 │
├─────────────────────────────────────────────────────────┤
│ defaultMiningTires = 8 × 4 = 32 neumáticos              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. ESCALAR NEUMATICOS POR AÑO                           │
├─────────────────────────────────────────────────────────┤
│ scaledMTiresPerYear = 20 × (48 / 32)                    │
│                     = 20 × 1.5                          │
│                     = 30 neumáticos/año                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. AHORRO EN NEUMÁTICOS                                 │
├─────────────────────────────────────────────────────────┤
│ tireSaving = 30 × $3,000 × 15%                          │
│            = 30 × $3,000 × 0.15                         │
│            = $13,500/año                                │
└─────────────────────────────────────────────────────────┘

┌═════════════════════════════════════════════════════════┐
║ RESUMEN - 8 HAUL TRUCKS (48 NEUMÁTICOS)                ║
╠═════════════════════════════════════════════════════════╣
║ a) Inversión inicial                                   ║
║    - Equipamiento: 8 veh × $2,200 = $17,600            ║
║    - Sensores: 48 neum × $60 = $2,880                  ║
║    - TOTAL: $20,480                                    ║
║                                                         ║
║ b) Ahorro combustible anual: $28,800                   ║
║                                                         ║
║ c) Ahorro neumáticos anual: $13,500                    ║
║                                                         ║
║ d) Ahorro downtime anual: $256,000                     ║
║                                                         ║
║ e) AHORRO TOTAL: $298,300/año                          ║
║                                                         ║
║ Recuperación: 20,480 ÷ 298,300 × 12 = 1 mes           ║
╚═════════════════════════════════════════════════════════╝
```

---

## 📋 EJEMPLO NUMÉRICO 4 - MINERA (RTG 16 ruedas)

### Configuración:
- **8 RTG 16 ruedas** × 16 ruedas = **128 neumáticos** ← CAMBIÓ
- 5,000 horas/año por vehículo
- Déficit de presión: 10%
- Neumáticos comprados/año (input): 20 (mismo valor)
- Costo neumático OTR: $3,000

### Cálculos:

```
┌─────────────────────────────────────────────────────────┐
│ 1. DEGRADACIÓN (igual que antes)                        │
├─────────────────────────────────────────────────────────┤
│ mTireDegradation = 10% × 1.5 = 15%                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. TAMAÑO DE FLOTA DEFAULT (REFERENCIA)                 │
├─────────────────────────────────────────────────────────┤
│ defaultMiningTires = 32 neumáticos (IGUAL)              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. ESCALAR NEUMATICOS POR AÑO                           │
├─────────────────────────────────────────────────────────┤
│ scaledMTiresPerYear = 20 × (128 / 32)                   │
│                     = 20 × 4.0                          │
│                     = 80 neumáticos/año  ← CAMBIÓ       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. AHORRO EN NEUMÁTICOS                                 │
├─────────────────────────────────────────────────────────┤
│ tireSaving = 80 × $3,000 × 15%                          │
│            = 80 × $3,000 × 0.15                         │
│            = $36,000/año         ← CAMBIÓ               │
└─────────────────────────────────────────────────────────┘

┌═════════════════════════════════════════════════════════┐
║ RESUMEN - 8 RTG 16 RUEDAS (128 NEUMÁTICOS)             ║
╠═════════════════════════════════════════════════════════╣
║ a) Inversión inicial                                   ║
║    - Equipamiento: 8 veh × $3,500 = $28,000            ║
║    - Sensores: 128 neum × $60 = $7,680                 ║
║    - TOTAL: $35,680                                    ║
║                                                         ║
║ b) Ahorro combustible anual: $28,800                   ║
║                                                         ║
║ c) Ahorro neumáticos anual: $36,000  ← CAMBIÓ          ║
║                                                         ║
║ d) Ahorro downtime anual: $256,000                     ║
║                                                         ║
║ e) AHORRO TOTAL: $320,800/año  ← CAMBIÓ                ║
║                                                         ║
║ Recuperación: 35,680 ÷ 320,800 × 12 = 2 meses         ║
╚═════════════════════════════════════════════════════════╝
```

### ✅ Comparación de Resultados

| Métrica | Haul Truck (48 neum) | RTG 16r (128 neum) | Cambio |
|---------|----------------------|---------------------|--------|
| Inversión | $20,480 | $35,680 | +74% |
| Ahorro Neumáticos | $13,500 | $36,000 | **+167%** ✅ |
| Ahorro Total | $298,300 | $320,800 | **+8%** ✅ |
| Recuperación | 1 mes | 2 meses | Aumentó |

**✅ CORRECTO:** El ahorro SÍ aumenta proporcionalmente (2.67x más neumáticos → 2.67x más ahorro).

---

## 📈 VALIDACIÓN DE LA FÓRMULA

### Lógica de la Fórmula

**Input del usuario:** `tiresPerYear` (cantidad de neumáticos comprados anualmente)

**Escalado proporcional:** El sistema escala este valor según el tamaño real de la flota:
```javascript
scaledTiresPerYear = tiresPerYear × (totalTires / defaultTotalTires)
```

**Ahorro:** Con TPMS se evita el % de degradación:
```javascript
tireSaving = scaledTiresPerYear × tireCost × (tireDegradationPct / 100)
```

### Factores que Ahora SÍ Afectan el Ahorro

✅ **Cantidad total de neumáticos** (`totalTires`)
- Más neumáticos = proporcionalmente más ahorro

✅ **Déficit de presión** (`pressureDiffPct`)
- Mayor déficit = mayor degradación = más ahorro

✅ **Costo del neumático** (`tireCost`)
- Neumáticos más caros = mayor ahorro monetario

✅ **Neumáticos por año** (`tiresPerYear`)
- Mayor tasa de reemplazo = mayor potencial de ahorro

---

## 🎯 CONCLUSIÓN

### Antes de la Corrección
- ❌ Cambiar cantidad de trailers/ruedas NO afectaba el ahorro
- ❌ El usuario veía una inversión mayor sin retorno proporcional
- ❌ La calculadora parecía que no funcionaba

### Después de la Corrección
- ✅ El ahorro en neumáticos se escala con la flota real
- ✅ Más neumáticos = proporcionalmente más ahorro
- ✅ Los resultados son realistas y consistentes
- ✅ Se mantienen las variables originales del usuario

### Interpretación del Input
**"Neumáticos comprados por año"** = valor de referencia que se escala proporcionalmente.

**Ejemplo:** Si configuraste 30 neum/año para 100 neumáticos (30% de reemplazo), 
al tener 660 neumáticos el sistema calcula `30 × (660/100) = 198 neum/año`.

**Beneficio:** El usuario mantiene su forma de pensar (cuántos neumáticos compra), 
y el sistema lo escala automáticamente según el tamaño de la flota.
