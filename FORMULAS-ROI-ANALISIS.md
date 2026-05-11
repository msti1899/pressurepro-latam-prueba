# Análisis de Fórmulas ROI - Calculadoras PressurePro

## 🔴 PROBLEMA IDENTIFICADO

Al cambiar la cantidad de **trailers** o la cantidad de **neumáticos** (ruedas), el ahorro total NO cambia. Esto es incorrecto.

**Causa:** El cálculo de ahorro en neumáticos usa un valor fijo manual (`tiresPerYear`) que NO está vinculado a la cantidad real de neumáticos en la flota.

---

## 📊 CALCULADORA DE TRANSPORTE (Flota de Camiones)

### ✅ Variables de Entrada

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `simpleTrucks` | Cantidad de camiones simples | 10 |
| `simpleWheels` | Ruedas por camión simple | 6 |
| `trailerTrucks` | Cantidad de trailers/remolques | 5 |
| `trailerWheels` | Ruedas por trailer | 8 |
| `kmPerYear` | Kilómetros por vehículo/año | 120,000 km |
| `fuelPricePerLiter` | Precio combustible | 1.2 USD/L |
| `pressureDiffPct` | % déficit de presión | 10% |
| `tiresPerYear` | Neumáticos comprados/año (MANUAL) | 30 |
| `tireCost` | Costo por neumático | 400 USD |
| `equipmentCostPerTruck` | Equipamiento por vehículo | 500 USD |
| `sensorCostPerWheel` | Sensor por rueda | 60 USD |

**Constante fija:**
- `AVG_MPG = 7.2` (Rendimiento promedio de camiones pesados)

---

### 📐 FÓRMULAS ACTUALES (Transporte)

#### 1️⃣ Total de Neumáticos
```
simpleTireTotal = simpleTrucks × simpleWheels
trailerTireTotal = trailerTrucks × trailerWheels
totalTires = simpleTireTotal + trailerTireTotal
totalVehicles = simpleTrucks + trailerTrucks
```

**Ejemplo:** 10 camiones × 6 ruedas + 5 trailers × 8 ruedas = **60 + 40 = 100 neumáticos**

---

#### 2️⃣ Inversión Inicial (a)
```
equipmentCost = totalVehicles × equipmentCostPerTruck
sensorCost = totalTires × sensorCostPerWheel
initialInvestment = equipmentCost + sensorCost
```

**Ejemplo:** 
- Equipamiento: 15 vehículos × 500 USD = 7,500 USD
- Sensores: 100 neumáticos × 60 USD = 6,000 USD
- **TOTAL: 13,500 USD**

✅ **CORRECTO** - Sí considera los trailers y cantidad de ruedas

---

#### 3️⃣ Ahorro en Combustible Anual (b)
```
litersPerKm = 3.785 / (AVG_MPG × 1.60934)
            = 3.785 / (7.2 × 1.60934)
            = 0.326 L/km

fuelLossFactor = pressureDiffPct × 0.003
               = 10% × 0.003 = 0.03

totalFuelPerYear = simpleTrucks × kmPerYear × litersPerKm
                 = 10 × 120,000 × 0.326
                 = 391,200 L/año

fuelSavingLiters = totalFuelPerYear × fuelLossFactor
                 = 391,200 × 0.03
                 = 11,736 L ahorrados

fuelSaving = fuelSavingLiters × fuelPricePerLiter
           = 11,736 × 1.2
           = 14,083 USD/año
```

**Nota:** Solo se consideran `simpleTrucks` porque los trailers NO tienen motor.

✅ **CORRECTO** - Es lógico que los trailers no consuman combustible

**Base científica:** Estudio NHTSA - 0.3% consumo extra por cada 1% de presión baja

---

#### 4️⃣ Ahorro en Neumáticos Anual (c) ⚠️ **PROBLEMA AQUÍ**
```
tireDegradationPct = pressureDiffPct × 1.5
                   = 10% × 1.5 = 15%

annualTireSpend = tiresPerYear × tireCost
                = 30 × 400
                = 12,000 USD

tireSaving = annualTireSpend × (tireDegradationPct / 100)
           = 12,000 × 0.15
           = 1,800 USD/año
```

🔴 **PROBLEMA:** `tiresPerYear` es un valor **manual fijo** (30 neumáticos).
- NO depende de `totalTires` (100 neumáticos en la flota)
- NO depende de cuántos trailers hay
- NO depende de cuántas ruedas tiene cada vehículo

**Resultado:** Cambiar trailers o ruedas NO afecta el ahorro de neumáticos.

---

#### 5️⃣ Ahorro Total Anual (e)
```
totalAnnualSaving = fuelSaving + tireSaving
                  = 14,083 + 1,800
                  = 15,883 USD/año
```

#### 6️⃣ Periodo de Recuperación
```
paybackMonths = ⌈(initialInvestment / totalAnnualSaving) × 12⌉
              = ⌈(13,500 / 15,883) × 12⌉
              = ⌈10.2⌉
              = 11 meses
```

---

## 🏗️ CALCULADORA MINERA / PORTUARIA / INDUSTRIAL

### ✅ Variables de Entrada

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `mVehicles` | Cantidad de vehículos | 8 |
| `mVehicleType` | Tipo de vehículo | 'haul' (Haul Truck) |
| `mWheels` | Ruedas por vehículo | 4 (varía según tipo) |
| `mHoursPerYear` | Horas operación/vehículo/año | 5,000 h |
| `mFuelLPH` | Consumo combustible | 20 L/h |
| `mFuelPrice` | Precio combustible | 1.2 USD/L |
| `mPressureDiff` | % déficit presión | 10% |
| `mTiresPerYear` | Neumáticos comprados/año (MANUAL) | 20 |
| `mTireCost` | Costo neumático OTR | 3,000 USD |
| `mDowntimeCost` | Costo por evento avería | 10,000 USD |
| `mDowntimeEvents` | Eventos por vehículo/año | 4 |

**Costos de equipamiento por tipo (ocultos):**
```javascript
Haul Truck:         2,200 USD/vehículo
Cargadora Frontal:  1,700 USD/vehículo
Reach Stacker:      1,900 USD/vehículo
RTG 16 ruedas:      3,500 USD/vehículo
RTG 8 ruedas:       2,290 USD/vehículo
Forwarder Forestal: 1,500 USD/vehículo
```

**Constante:**
- `sensorCostPerWheel = 60 USD`

---

### 📐 FÓRMULAS ACTUALES (Minera/Portuaria)

#### 1️⃣ Total de Neumáticos
```
totalTires = mVehicles × mWheels
```

**Ejemplo:** 8 vehículos × 4 ruedas = **32 neumáticos**

---

#### 2️⃣ Inversión Inicial (a)
```
equipmentCost = mVehicles × vehicleEquipmentCost[mVehicleType]
              = 8 × 2,200 (Haul Truck)
              = 17,600 USD

sensorCost = totalTires × 60
           = 32 × 60
           = 1,920 USD

initialInvestment = equipmentCost + sensorCost
                  = 17,600 + 1,920
                  = 19,520 USD
```

✅ **CORRECTO** - Sí considera cantidad de vehículos y ruedas

---

#### 3️⃣ Ahorro en Combustible Anual (b)
```
totalFuelPerYear = mVehicles × mHoursPerYear × mFuelLPH
                 = 8 × 5,000 × 20
                 = 800,000 L/año

fuelLossFactor = mPressureDiff × 0.003
               = 10% × 0.003 = 0.03

fuelSavingLiters = totalFuelPerYear × fuelLossFactor
                 = 800,000 × 0.03
                 = 24,000 L ahorrados

fuelSaving = fuelSavingLiters × mFuelPrice
           = 24,000 × 1.2
           = 28,800 USD/año
```

✅ **CORRECTO** - Depende de cantidad de vehículos

---

#### 4️⃣ Ahorro en Neumáticos Anual (c) ⚠️ **PROBLEMA AQUÍ**
```
mTireDegradation = mPressureDiff × 1.5
                 = 10% × 1.5 = 15%

tireSaving = mTiresPerYear × mTireCost × (mTireDegradation / 100)
           = 20 × 3,000 × 0.15
           = 9,000 USD/año
```

🔴 **PROBLEMA:** `mTiresPerYear` es un valor **manual fijo** (20 neumáticos).
- NO depende de `totalTires` (32 neumáticos en la flota)
- NO depende de cuántos vehículos hay
- NO depende del tipo de vehículo ni sus ruedas

**Resultado:** Cambiar vehículos o tipo NO afecta el ahorro de neumáticos.

---

#### 5️⃣ Ahorro en Downtime Anual (d)
```
downtimeSaving = mDowntimeEvents × mVehicles × mDowntimeCost × 0.80
               = 4 × 8 × 10,000 × 0.80
               = 256,000 USD/año
```

✅ **CORRECTO** - Sí depende de cantidad de vehículos

**Nota:** El factor 0.80 (80%) asume que el TPMS previene 8 de cada 10 averías relacionadas con neumáticos.

---

#### 6️⃣ Ahorro Total Anual (e)
```
totalAnnualSaving = fuelSaving + tireSaving + downtimeSaving
                  = 28,800 + 9,000 + 256,000
                  = 293,800 USD/año
```

#### 7️⃣ Periodo de Recuperación
```
paybackMonths = ⌈(initialInvestment / totalAnnualSaving) × 12⌉
              = ⌈(19,520 / 293,800) × 12⌉
              = ⌈0.8⌉
              = 1 mes
```

---

## 🔧 SOLUCIÓN PROPUESTA

### Opción A: Calcular automáticamente `tiresPerYear`

Basarse en el desgaste esperado según los km/horas de uso:

#### Para Transporte:
```javascript
// Vida útil promedio: 80,000 km por neumático en condiciones normales
const tireLifeKm = 80000;

// Con presión incorrecta, la vida útil se reduce
const adjustedTireLife = tireLifeKm / (1 + (tireDegradationPct / 100));

// Km totales de la flota por año (solo camiones, trailers son remolcados)
const totalFleetKm = simpleTrucks * kmPerYear;

// Neumáticos que se desgastan por año
const calculatedTiresPerYear = (totalTires * totalFleetKm) / adjustedTireLife;

// Ahorro = diferencia entre comprar con presión mala vs. buena
const tiresWithBadPressure = (totalTires * totalFleetKm) / (tireLifeKm / (1 + (tireDegradationPct / 100)));
const tiresWithGoodPressure = (totalTires * totalFleetKm) / tireLifeKm;
const tireSaving = (tiresWithBadPressure - tiresWithGoodPressure) × tireCost;
```

#### Para Minera:
```javascript
// Vida útil promedio: 3,500 horas por neumático OTR
const tireLifeHours = 3500;

// Con presión incorrecta, reduce vida útil
const adjustedTireLife = tireLifeHours / (1 + (mTireDegradation / 100));

// Horas totales de la flota
const totalFleetHours = mVehicles * mHoursPerYear;

// Neumáticos que se desgastan por año
const calculatedTiresPerYear = (totalTires * totalFleetHours) / adjustedTireLife;

// Ahorro
const tiresWithBadPressure = (totalTires * totalFleetHours) / (tireLifeHours / (1 + (mTireDegradation / 100)));
const tiresWithGoodPressure = (totalTires * totalFleetHours) / tireLifeHours;
const tireSaving = (tiresWithBadPressure - tiresWithGoodPressure) × mTireCost;
```

### Opción B: Mantener input manual pero calcular % sobre flota real

```javascript
// Asumir que tiresPerYear corresponde a un % de la flota
const tireReplacementRate = tiresPerYear / totalTires;
const tireSaving = (totalTires × tireReplacementRate × tireCost) × (tireDegradationPct / 100);
```

---

## ✅ RECOMENDACIÓN

**Opción A (Cálculo automático)** es más precisa y realista:

✅ El ahorro dependerá de:
- Cantidad total de neumáticos (camiones + trailers)
- Km/horas recorridos
- Tipo de vehículo
- Condiciones de presión

✅ Elimina la confusión del usuario sobre qué valor poner en "neumáticos por año"

✅ Los cambios en trailers/ruedas SÍ afectarán el resultado final

---

## 📋 RESUMEN DEL PROBLEMA

| Aspecto | Estado Actual | Debería |
|---------|---------------|---------|
| Inversión inicial | ✅ Depende de flota real | ✅ Correcto |
| Ahorro combustible | ✅ Depende de vehículos | ✅ Correcto |
| Ahorro neumáticos | ❌ Valor fijo manual | ❌ Calcular según flota |
| Ahorro downtime (minera) | ✅ Depende de vehículos | ✅ Correcto |

**Impacto:** Cambiar trailers o ruedas NO cambia el ahorro total → usuario piensa que la calculadora no funciona.
