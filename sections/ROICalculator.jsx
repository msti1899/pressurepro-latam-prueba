'use client';
import React, { useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';
import ContactModal from '../components/ContactModal';

// ═══════════════════════════════════════════════════════════════════════════════
// FÓRMULAS UTILIZADAS — Calculadora Flota de Transporte
// ─────────────────────────────────────────────────────────────────────────────
//
// NEUMÁTICOS:
//   Total simples   = nCamionesSimples × ruedasPorCamionSimple
//   Total trailers  = nCamionesTrailer × ruedasPorCamionTrailer
//   Total flota     = simples + trailers
//
// INVERSIÓN INICIAL (costo único):
//   Equipamiento = (simples + trailers) × costoEquipo/camión
//   Sensores     = totalNeum × costoSensor/rueda
//   TOTAL        = equipamiento + sensores
//
// AHORRO EN COMBUSTIBLE (anual):
//   L/km = 3.785 / (MPG × 1.60934)          [conversión MPG → litros/km]
//   Factor pérdida = déficit% × 0.003        [NHTSA: 0.3% consumo extra por 1% presión baja]
//   CombustibleTotal/año (L) = totalVehículos × km/año × L/km
//   AhorroCombustible (L)    = CombustibleTotal × factorPérdida
//   AhorroCombustible ($)    = litrosAhorrados × precioLitro
//
// AHORRO EN NEUMÁTICOS (anual):
//   GastoNeum/año = neum/año × costoNeum
//   AhorroNeum    = GastoNeum × (degradación% / 100)
//
// AHORRO TOTAL ANUAL:
//   AhorroCombustible + AhorroNeum
//
// ═══════════════════════════════════════════════════════════════════════════════

const AVG_MPG = 7.2; // Valor fijo — promedio flotas pesadas de larga distancia

const DEFAULTS = {
  equipmentCostPerTruck: 500,
  sensorCostPerWheel: 60,
  simpleTrucks: 10,
  simpleWheelsPerTruck: 6,
  trailerTrucks: 5,
  trailerWheelsPerTruck: 8,
  kmPerYear: 120000,
  fuelPricePerLiter: 1.2,
  pressureDifferencePct: 10,
  tiresPerYear: 30,
  tireCost: 400,
};

// ═══════════════════════════════════════════════════════════════════════════════
// FÓRMULAS — Calculadora Minera / Portuaria / Industrial
// ─────────────────────────────────────────────────────────────────────────────
// NEUMÁTICOS:
//   Total = nVehículos × ruedasPorTipoVehículo
//
// INVERSIÓN INICIAL:
//   Equipamiento = nVehículos × costoEquipo[tipoVehículo]   ← varía por tipo
//     Haul Truck USD 2.200 · Cargadora USD 1.700 · Reach Stacker USD 1.900
//     RTG 16r USD 3.500 · RTG 8r USD 2.290 · Forwarder USD 1.500
//   Sensores     = totalNeum × USD 60/rueda
//   TOTAL        = equipamiento + sensores
//
// AHORRO COMBUSTIBLE (anual):
//   CombustibleTotal (L/año) = nVehículos × horas/año × L/hora
//   AhorroCombustible (L)    = total × (déficit% × 0.003)
//   AhorroCombustible ($)    = litrosAhorrados × precio/L
//
// AHORRO NEUMÁTICOS (anual):
//   GastoNeum  = neum/año × costo/neum
//   AhorroNeum = GastoNeum × (degradación% / 100)
//
// AHORRO DOWNTIME (anual):
//   AhorroDowntime = eventos/año/veh × nVehículos × costo/evento × 0.80
//
// REPAGO (meses):
//   ceil(inversión / (ahorro total / 12))
// ═══════════════════════════════════════════════════════════════════════════════

const MINING_DEFAULTS = {
  vehicles: 8,
  wheelsPerVehicle: 4,
  hoursPerYear: 5000,
  fuelLitersPerHour: 20,
  fuelPricePerLiter: 1.2,
  pressureDifferencePct: 10,
  tiresPerYear: 20,
  tireCost: 3000,
  downtimeCostPerEvent: 10000,
  downtimeEventsPerVehiclePerYear: 4,
};

// ─── Pricing minera (oculto del público) ─────────────────────────────────────
const MINING_PRICING = {
  sensorCostPerWheel: 60,
};

// ─── Tipos de vehículo para calculadora minera ────────────────────────────────
// Costos de equipamiento por tipo (oculto del público — solo para cálculo de ROI)
const VEHICLE_TYPES = [
  { id: 'haul',      label: 'Haul Truck',         wheels: 6,  equipmentCost: 2200 },
  { id: 'loader',    label: 'Cargadora Frontal',   wheels: 4,  equipmentCost: 1700 },
  { id: 'reach',     label: 'Reach Stacker',       wheels: 6,  equipmentCost: 1900 },
  { id: 'rtg16',     label: 'RTG 16 ruedas',       wheels: 16, equipmentCost: 3500 },
  { id: 'rtg8',      label: 'RTG 8 ruedas',        wheels: 8,  equipmentCost: 2290 },
  { id: 'forwarder', label: 'Forwarder Forestal',  wheels: 8,  equipmentCost: 1500 },
];

// ─── Componentes UI reutilizables ──────────────────────────────────────────────

function SliderInput({ label, value, onChange, min, max, step, format, hint }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <label className="text-white/80 text-[15px] font-medium leading-tight">{label}</label>
          {hint && (
            <span className="group relative flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white/30 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-xl bg-[#2a2845] border border-white/10 px-3 py-2 text-xs text-white/70 leading-snug opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl">{hint}</span>
            </span>
          )}
        </div>
        <span className="text-purple-300 font-bold text-[15px] tabular-nums flex-shrink-0">{format(value)}</span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-100" style={{ width: `${pct}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-7 -top-2.5"
          style={{ touchAction: 'none' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 border-2 border-purple-200 shadow-lg shadow-purple-500/50 transition-all duration-100 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

function ToggleGroup({ label, value, onChange, options }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-white/80 text-[15px] font-medium leading-tight">{label}</span>
      <div className="flex rounded-lg overflow-hidden border border-white/10">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 text-sm font-bold transition-all min-w-[44px] ${
              value === opt
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mt-6 pb-2 border-b border-white/10">
      {children}
    </p>
  );
}

function ResultRow({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between py-2.5 px-4 rounded-xl gap-3 ${
      highlight ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-white/[0.04]'
    }`}>
      <span className="text-[15px] leading-tight text-white/75">{label}</span>
      <span className={`font-bold tabular-nums text-[15px] whitespace-nowrap ${highlight ? 'text-emerald-300' : 'text-white'}`}>{value}</span>
    </div>
  );
}

const VEHICLE_IMAGES = {
  haul:      '/iconos/Haul-Truck-removebg-preview.png',
  loader:    '/iconos/Front-wheel-loader-removebg-preview.png',
  reach:     '/iconos/Reach-Stacker-removebg-preview.png',
  rtg16:     '/iconos/RTG-16-neumáticos-Photoroom.png',
  rtg8:      '/iconos/RTG-8-neumáticos-Photoroom.png',
  forwarder: '/iconos/Forwarder-forestal-removebg-preview.png',
};

const ITEMS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(VEHICLE_TYPES.length / ITEMS_PER_PAGE);

function VehicleTypeSelector({ value, onChange, sectionLabel }) {
  const initPage = Math.floor(VEHICLE_TYPES.findIndex(vt => vt.id === value) / ITEMS_PER_PAGE);
  const [page, setPage] = useState(Math.max(0, initPage));

  const navigate = (dir) => {
    setPage(p => (p + dir + TOTAL_PAGES) % TOTAL_PAGES);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm font-medium leading-tight">{sectionLabel || 'Tipo de vehículo'}</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-300 ${i === page ? 'bg-purple-400 w-4 h-1.5' : 'bg-white/20 w-1.5 h-1.5'}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Prev arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#0f1e2a] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-purple-500/50 transition-all duration-200 shadow-lg"
          aria-label="Anterior"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Sliding track */}
        <div className="overflow-hidden mx-2">
          <motion.div
            className="flex"
            animate={{ x: `${-page * (100 / TOTAL_PAGES)}%` }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: `${TOTAL_PAGES * 100}%` }}
          >
            {Array.from({ length: TOTAL_PAGES }).map((_, pageIdx) => (
              <div
                key={pageIdx}
                className="grid grid-cols-3 gap-2"
                style={{ width: `${100 / TOTAL_PAGES}%`, flexShrink: 0 }}
              >
                {VEHICLE_TYPES.slice(pageIdx * ITEMS_PER_PAGE, (pageIdx + 1) * ITEMS_PER_PAGE).map(vt => (
                  <button
                    key={vt.id}
                    type="button"
                    onClick={() => onChange(vt.id, vt.wheels)}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all duration-200 ${
                      value === vt.id
                        ? 'border-purple-500 bg-purple-600/20 text-white shadow-sm shadow-purple-500/20'
                        : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-purple-500/40 hover:text-white/75 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="w-full" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={VEHICLE_IMAGES[vt.id]}
                        alt={vt.label}
                        className={`w-full h-full object-contain transition-opacity duration-200 ${
                          value === vt.id ? 'opacity-100' : 'opacity-50'
                        }`}
                        draggable={false}
                      />
                    </div>
                    <span className="text-xs font-semibold leading-tight text-center">{vt.label}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      value === vt.id ? 'bg-purple-500/30 text-purple-300' : 'text-white/30'
                    }`}>
                      {vt.wheels} ruedas
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next arrow */}
        <button
          onClick={() => navigate(1)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#0f1e2a] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-purple-500/50 transition-all duration-200 shadow-lg"
          aria-label="Siguiente"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}


const ROICalculator = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations?.roiCalculator;
  const router = useRouter();
  const [modalType, setModalType] = useState(null);
  const [fleetType, setFleetType] = useState('transport');

  // Moneda: EUR para España (locale epa), USD para el resto
  const isSpain = router.locale === 'epa';
  const symbol = isSpain ? '€' : 'US$';

  // ─── Estado de inputs ───────────────────────────────────────────────────────
  const [equipmentCostPerTruck, setEquipmentCostPerTruck] = useState(DEFAULTS.equipmentCostPerTruck);
  const [sensorCostPerWheel, setSensorCostPerWheel] = useState(DEFAULTS.sensorCostPerWheel);
  const [simpleTrucks, setSimpleTrucks] = useState(DEFAULTS.simpleTrucks);
  const [simpleWheels, setSimpleWheels] = useState(DEFAULTS.simpleWheelsPerTruck);
  const [trailerTrucks, setTrailerTrucks] = useState(DEFAULTS.trailerTrucks);
  const [trailerWheels, setTrailerWheels] = useState(DEFAULTS.trailerWheelsPerTruck);
  const [kmPerYear, setKmPerYear] = useState(DEFAULTS.kmPerYear);
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState(DEFAULTS.fuelPricePerLiter);
  const [pressureDiffPct, setPressureDiffPct] = useState(DEFAULTS.pressureDifferencePct);
  const [tiresPerYear, setTiresPerYear] = useState(DEFAULTS.tiresPerYear);
  const [tireCost, setTireCost] = useState(DEFAULTS.tireCost);

  // ─── Estado mining ────────────────────────────────────────────────────────
  const [mVehicles, setMVehicles] = useState(MINING_DEFAULTS.vehicles);
  const [mWheels, setMWheels] = useState(MINING_DEFAULTS.wheelsPerVehicle);
  const [mHoursPerYear, setMHoursPerYear] = useState(MINING_DEFAULTS.hoursPerYear);
  const [mFuelLPH, setMFuelLPH] = useState(MINING_DEFAULTS.fuelLitersPerHour);
  const [mFuelPrice, setMFuelPrice] = useState(MINING_DEFAULTS.fuelPricePerLiter);
  const [mPressureDiff, setMPressureDiff] = useState(MINING_DEFAULTS.pressureDifferencePct);
  const [mTiresPerYear, setMTiresPerYear] = useState(MINING_DEFAULTS.tiresPerYear);
  const [mTireCost, setMTireCost] = useState(MINING_DEFAULTS.tireCost);
  const [mDowntimeCost, setMDowntimeCost] = useState(MINING_DEFAULTS.downtimeCostPerEvent);
  const [mDowntimeEvents, setMDowntimeEvents] = useState(MINING_DEFAULTS.downtimeEventsPerVehiclePerYear);  const [mVehicleType, setMVehicleType] = useState('haul');
  // ─── Cálculos mining ─────────────────────────────────────────────────────
  const miningResults = useMemo(() => {
    const totalTires = mVehicles * mWheels;
    const selectedVehicle = VEHICLE_TYPES.find(v => v.id === mVehicleType);
    const equipmentCost = mVehicles * (selectedVehicle?.equipmentCost || 0);
    const sensorCost = totalTires * MINING_PRICING.sensorCostPerWheel;
    const initialInvestment = equipmentCost + sensorCost;

    const totalFuelPerYear = mVehicles * mHoursPerYear * mFuelLPH;
    const fuelLossFactor = mPressureDiff * 0.003;
    const fuelSavingLiters = totalFuelPerYear * fuelLossFactor;
    const fuelSaving = fuelSavingLiters * mFuelPrice;

    // % degradación = 1.5 × diferencia de presión (fórmula derivada)
    const mTireDegradation = mPressureDiff * 1.5;
    const tireSaving = mTiresPerYear * mTireCost * (mTireDegradation / 100);
    const downtimeSaving = mDowntimeEvents * mVehicles * mDowntimeCost * 0.80;
    const totalAnnualSaving = fuelSaving + tireSaving + downtimeSaving;
    const paybackMonths = totalAnnualSaving > 0 ? Math.ceil((initialInvestment / totalAnnualSaving) * 12) : null;

    const fmt = (val) => `${symbol} ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return {
      totalTires,
      initialInvestment: fmt(initialInvestment),
      vehicleEquipmentCost: selectedVehicle?.equipmentCost || 0,
      fuelSaving: fmt(fuelSaving),
      fuelSavingLiters: `${Math.round(fuelSavingLiters).toLocaleString('de-DE')} L`,
      tireSaving: fmt(tireSaving),
      tireDegradationPct: Math.round(mTireDegradation * 10) / 10,
      downtimeSaving: fmt(downtimeSaving),
      totalAnnualSaving: fmt(totalAnnualSaving),
      paybackMonths,
    };
  }, [mVehicles, mWheels, mHoursPerYear, mFuelLPH, mFuelPrice, mPressureDiff,
      mTiresPerYear, mTireCost, mDowntimeCost, mDowntimeEvents, mVehicleType, symbol]);

  // ─── Cálculos transport ──────────────────────────────────────────────────
  const results = useMemo(() => {
    const simpleTireTotal = simpleTrucks * simpleWheels;
    const trailerTireTotal = trailerTrucks * trailerWheels;
    const totalTires = simpleTireTotal + trailerTireTotal;
    const totalVehicles = simpleTrucks + trailerTrucks;

    // Inversión inicial (costo único)
    const equipmentCost = totalVehicles * equipmentCostPerTruck;
    const sensorCost = totalTires * sensorCostPerWheel;
    const initialInvestment = equipmentCost + sensorCost;

    // Ahorro combustible anual
    // Solo los camiones (simpleTrucks) consumen combustible — los trailers no tienen motor
    // L/km = 3.785 / (MPG × 1.60934)
    const litersPerKm = 3.785 / (AVG_MPG * 1.60934);
    // NHTSA: 0.3% consumo extra por cada 1% de presión baja
    const fuelLossFactor = pressureDiffPct * 0.003;
    const totalFuelPerYear = simpleTrucks * kmPerYear * litersPerKm;
    const fuelSavingLiters = totalFuelPerYear * fuelLossFactor;
    const fuelSaving = fuelSavingLiters * fuelPricePerLiter;

    // Ahorro neumáticos anual
    // % degradación = 1.5 × diferencia de presión (fórmula derivada)
    const tireDegradationPct = pressureDiffPct * 1.5;
    const annualTireSpend = tiresPerYear * tireCost;
    const tireSaving = annualTireSpend * (tireDegradationPct / 100);

    // Ahorro total anual
    const totalAnnualSaving = fuelSaving + tireSaving;
    const paybackMonths = totalAnnualSaving > 0 ? Math.ceil((initialInvestment / totalAnnualSaving) * 12) : null;

    const fmt = (val) => `${symbol} ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return {
      simpleTireTotal,
      trailerTireTotal,
      totalTires,
      initialInvestment: fmt(initialInvestment),
      fuelSaving: fmt(fuelSaving),
      fuelSavingLiters: `${Math.round(fuelSavingLiters).toLocaleString('de-DE')} L`,
      tireSaving: fmt(tireSaving),
      tireDegradationPct: Math.round(tireDegradationPct * 10) / 10,
      totalAnnualSaving: fmt(totalAnnualSaving),
      paybackMonths,
    };
  }, [simpleTrucks, simpleWheels, trailerTrucks, trailerWheels, equipmentCostPerTruck,
      sensorCostPerWheel, kmPerYear, fuelPricePerLiter, pressureDiffPct,
      tiresPerYear, tireCost, symbol]);

  if (!t) return null;

  const fmtC = (v) => `${symbol} ${Number(v).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtN = (v) => v.toLocaleString('de-DE');
  const fmtKm = (v) => `${v.toLocaleString('de-DE')} km`;
  const fmtPct = (v) => `${v}%`;

  return (
    <section id="roi-calculator" className="sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TypingText title={`| ${t.eyebrow}`} textStyles="text-center" />
        <TitleText title={t.title} textStyles="text-center" as="h2" />
        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 0.8)}
          className="mt-4 text-center text-white/60 text-[15px] max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>

        {/* Selector de tipo de flota */}
        <motion.div variants={fadeIn('up', 'tween', 0.25, 0.8)} className="mt-8 flex justify-center">
          <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1 gap-1">
            <button
              onClick={() => setFleetType('transport')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                fleetType === 'transport' ? 'bg-purple-600 text-white shadow-md' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {/* Camión de larga distancia */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              {t.tabs?.transport || 'Flota de Transporte'}
            </button>
            <button
              onClick={() => setFleetType('mining')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                fleetType === 'mining' ? 'bg-purple-600 text-white shadow-md' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {/* Llave + destornillador (maquinaria industrial / minería) */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
              {t.tabs?.mining || 'Flota Minera / Portuaria / Industrial'}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {fleetType === 'transport' ? (
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8 xl:items-start"
            >
              {/* ── Panel izquierdo: Inputs ─────────────────────────────────── */}
              <div className="flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0d1a24] via-[#0f1e2a] to-[#121f30] p-6 md:p-8 gap-4">

                <SectionLabel>{t.inputs?.sectionFleet || 'Datos de la flota'}</SectionLabel>
                <SliderInput
                  label={t.inputs?.simpleTrucks || 'Cantidad de Camiones'}
                  value={simpleTrucks} onChange={setSimpleTrucks}
                  min={0} max={2000} step={1} format={fmtN}
                />
                <ToggleGroup
                  label={t.inputs?.simpleWheels || 'Ruedas por camión'}
                  value={simpleWheels} onChange={setSimpleWheels} options={[6, 10, 12]}
                />
                <SliderInput
                  label={t.inputs?.trailerTrucks || 'Cantidad de Trailers / Remolques / Acoplados'}
                  value={trailerTrucks} onChange={setTrailerTrucks}
                  min={0} max={2000} step={1} format={fmtN}
                />
                <ToggleGroup
                  label={t.inputs?.trailerWheels || 'Ruedas por trailer'}
                  value={trailerWheels} onChange={setTrailerWheels} options={[8, 12]}
                />
                <SliderInput
                  label={t.inputs?.kmPerYear || 'Km por vehículo al año'}
                  value={kmPerYear} onChange={setKmPerYear}
                  min={10000} max={500000} step={5000} format={fmtKm}
                />

                <SectionLabel>{t.inputs?.sectionCosts || 'Costos operativos'}</SectionLabel>
                <SliderInput
                  label={t.inputs?.fuelPricePerLiter || 'Precio del litro de combustible'}
                  value={fuelPricePerLiter} onChange={setFuelPricePerLiter}
                  min={0.3} max={4} step={0.05} format={fmtC}
                />
                <SliderInput
                  label={t.inputs?.pressureDifferencePct || 'Diferencia de presión (recomendada vs. actual)'}
                  value={pressureDiffPct} onChange={setPressureDiffPct}
                  min={1} max={40} step={1} format={fmtPct}
                  hint={t.inputs?.pressureDiffHint || 'Porcentaje promedio por debajo de la presión recomendada. Ej: 10% = presión 10% baja'}
                />
                <SliderInput
                  label={t.inputs?.tiresPerYear || 'Neumáticos comprados por año (flota completa)'}
                  value={tiresPerYear} onChange={setTiresPerYear}
                  min={0} max={2000} step={5} format={fmtN}
                />
                <SliderInput
                  label={t.inputs?.tireCost || 'Costo promedio de neumático nuevo'}
                  value={tireCost} onChange={setTireCost}
                  min={100} max={3000} step={25} format={fmtC}
                />
                <div className="flex items-center justify-between gap-2 py-1">
                  <span className="text-white/50 text-[15px] leading-tight">{t.inputs?.tireDegradationPct || '% degradación por presión incorrecta'}</span>
                  <span className="text-purple-300/70 font-bold text-[15px] tabular-nums">{(pressureDiffPct * 1.5).toFixed(1)}%</span>
                </div>
                <p className="text-white/25 text-xs -mt-2">
                  {t.inputs?.tireDegradationAuto || 'Calculado automáticamente: 1,5 × diferencia de presión'}
                </p>
              </div>

              {/* ── Panel derecho: Resultados ───────────────────────────────── */}
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0d1a24] via-[#0f1e2a] to-[#121f30] p-6 md:p-8 flex flex-col gap-5 xl:sticky xl:top-8">

                {/* 3.1 / 3.2 / 3.3 — Resumen de neumáticos */}
                <div className="flex flex-col gap-3 pb-5 border-b border-white/10">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                    {t.results?.tiresLabel || 'Total de neumáticos en flota'}
                  </p>
                  <div className="flex flex-col gap-2">
                    <ResultRow
                      label={t.results?.simpleTires || 'Total neumáticos — camiones'}
                      value={results.simpleTireTotal.toLocaleString('de-DE')}
                    />
                    <ResultRow
                      label={t.results?.trailerTires || 'Total neumáticos — trailers / remolques'}
                      value={results.trailerTireTotal.toLocaleString('de-DE')}
                    />
                    <ResultRow
                      label={t.results?.totalTires || 'TOTAL neumáticos en flota'}
                      value={results.totalTires.toLocaleString('de-DE')}
                      highlight
                    />
                  </div>
                </div>

                {/* b) y c) Ahorros anuales */}
                <div className="flex flex-col gap-3 pb-5 border-b border-white/10">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                    {t.results?.savingsLabel || 'Ahorros anuales estimados'}
                  </p>
                  <div className="flex flex-col gap-2">
                    <ResultRow
                      label={t.results?.fuelSaving || 'b) Ahorro en consumo de combustible'}
                      value={results.fuelSaving}
                    />
                    <p className="text-white/30 text-xs px-1 -mt-1">
                      {results.fuelSavingLiters} × {fmtC(fuelPricePerLiter)}/L
                      {' · '}
                      {pressureDiffPct}% déficit → {(pressureDiffPct * 0.3).toFixed(1)}% consumo extra
                    </p>
                    <ResultRow
                      label={t.results?.tireSaving || 'c) Ahorro en reemplazo de neumáticos'}
                      value={results.tireSaving}
                    />
                    <p className="text-white/30 text-xs px-1 -mt-1">
                      {tiresPerYear} neum/año × {fmtC(tireCost)} × {results.tireDegradationPct}% degradación
                    </p>
                  </div>
                </div>

                {/* e) Ahorro total anual — card destacada */}
                <motion.div
                  key={results.totalAnnualSaving}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[24px] border border-emerald-400/60 bg-gradient-to-br from-emerald-900/40 to-[#1a1830] p-6 flex flex-col gap-2 shadow-[0_0_50px_rgba(52,211,153,0.18)]"
                >
                  <p className="text-emerald-400/80 text-sm font-bold uppercase tracking-widest">
                    {t.results?.totalSavingLabel || 'e) Ahorro total de la flota por año'}
                  </p>
                  <p className="text-5xl font-extrabold text-emerald-300 tabular-nums leading-none">
                    {results.totalAnnualSaving}
                  </p>
                  {results.paybackMonths && (
                    <p className="text-emerald-400/70 text-sm font-medium">
                      {(t.results?.paybackLabel || 'Recupero de inversión en {n} meses').replace('{n}', results.paybackMonths)}
                    </p>
                  )}
                  <p className="text-white/30 text-xs leading-relaxed mt-1">{t.disclaimer}</p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  variants={fadeIn('up', 'tween', 0.4, 0.7)}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  <button
                    onClick={() => setModalType('quote')}
                    className="px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:bg-purple-600 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {translations?.cta?.quoteButton || 'Solicitar Cotización'}
                  </button>
                  <button
                    onClick={() => setModalType('demo')}
                    className="px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {translations?.cta?.demoButton || 'Demo Gratuita'}
                  </button>
                </motion.div>
              </div>
            </motion.div>

          ) : (
            /* ── Calculadora Minera / Portuaria ──────────────────────────── */
            <motion.div
              key="mining"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8 xl:items-start"
            >
              {/* ── Panel izquierdo: Inputs ─────────────────────────────────── */}
              <div className="flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0d1a24] via-[#0f1e2a] to-[#121f30] p-6 md:p-8 gap-4">

                <SectionLabel>{t.mining?.sectionFleet || 'Datos de la flota'}</SectionLabel>
                <VehicleTypeSelector
                  value={mVehicleType}
                  onChange={(id, wheels) => { setMVehicleType(id); setMWheels(wheels); }}
                  sectionLabel={t.mining?.vehicleTypeLabel || 'Seleccionar tipo de vehículo'}
                />
                <SliderInput
                  label={t.mining?.vehicles || 'Cantidad de vehículos'}
                  value={mVehicles} onChange={setMVehicles}
                  min={1} max={200} step={1} format={fmtN}
                />
                <SliderInput
                  label={t.mining?.hoursPerYear || 'Horas de operación por vehículo/año'}
                  value={mHoursPerYear} onChange={setMHoursPerYear}
                  min={500} max={8760} step={100}
                  format={(v) => `${v.toLocaleString('de-DE')} h`}
                />
                <SliderInput
                  label={t.mining?.fuelLitersPerHour || 'Consumo promedio (L/hora)'}
                  value={mFuelLPH} onChange={setMFuelLPH}
                  min={5} max={100} step={1}
                  format={(v) => `${v.toLocaleString('de-DE')} L/h`}
                />

                <SectionLabel>{t.mining?.sectionCosts || 'Costos operativos'}</SectionLabel>
                <SliderInput
                  label={t.mining?.fuelPrice || 'Precio del litro de combustible'}
                  value={mFuelPrice} onChange={setMFuelPrice}
                  min={0.3} max={4} step={0.05} format={fmtC}
                />
                <SliderInput
                  label={t.mining?.pressureDiff || 'Diferencia de presión (recomendada vs. actual)'}
                  value={mPressureDiff} onChange={setMPressureDiff}
                  min={1} max={40} step={1} format={fmtPct}
                  hint={t.mining?.pressureDiffHint || 'Porcentaje promedio por debajo de la presión recomendada'}
                />
                <SliderInput
                  label={t.mining?.tiresPerYear || 'Neumáticos comprados por año (flota completa)'}
                  value={mTiresPerYear} onChange={setMTiresPerYear}
                  min={0} max={500} step={1} format={fmtN}
                />
                <SliderInput
                  label={t.mining?.tireCost || 'Costo promedio de neumático OTR'}
                  value={mTireCost} onChange={setMTireCost}
                  min={500} max={50000} step={500} format={fmtC}
                />
                <div className="flex items-center justify-between gap-2 py-1">
                  <span className="text-white/50 text-[15px] leading-tight">{t.mining?.tireDegradation || '% degradación por presión incorrecta'}</span>
                  <span className="text-purple-300/70 font-bold text-[15px] tabular-nums">{(mPressureDiff * 1.5).toFixed(1)}%</span>
                </div>
                <p className="text-white/25 text-xs -mt-2">
                  {t.mining?.tireDegradationAuto || 'Calculado automáticamente: 1,5 × diferencia de presión'}
                </p>
                <SliderInput
                  label={t.mining?.downtimeCost || 'Costo por evento de avería / parada'}
                  value={mDowntimeCost} onChange={setMDowntimeCost}
                  min={1000} max={200000} step={1000} format={fmtC}
                  hint={t.mining?.downtimeCostHint || 'Incluye pérdida de producción, mano de obra y traslado en operaciones 24/7'}
                />
                <SliderInput
                  label={t.mining?.downtimeEvents || 'Eventos de avería por vehículo / año'}
                  value={mDowntimeEvents} onChange={setMDowntimeEvents}
                  min={0} max={30} step={1}
                  format={(v) => `${v.toLocaleString('de-DE')} eventos`}
                />
              </div>

              {/* ── Panel derecho: Resultados ───────────────────────────────── */}
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0d1a24] via-[#0f1e2a] to-[#121f30] p-6 md:p-8 flex flex-col gap-5 xl:sticky xl:top-8">

                {/* Total neumáticos */}
                <div className="flex flex-col gap-3 pb-5 border-b border-white/10">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                    {t.mining?.tiresLabel || 'Total de neumáticos en flota'}
                  </p>
                  <ResultRow
                    label={`${mVehicles.toLocaleString('de-DE')} × ${VEHICLE_TYPES.find(v => v.id === mVehicleType)?.label || 'vehículo'} (${mWheels} ruedas)`}
                    value={miningResults.totalTires.toLocaleString('de-DE')}
                    highlight
                  />
                </div>

                {/* b / c / d — Ahorros anuales */}
                <div className="flex flex-col gap-3 pb-5 border-b border-white/10">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                    {t.mining?.savingsLabel || 'Ahorros anuales estimados'}
                  </p>
                  <div className="flex flex-col gap-2">
                    <ResultRow
                      label={t.mining?.fuelSaving || 'b) Ahorro en consumo de combustible'}
                      value={miningResults.fuelSaving}
                    />
                    <p className="text-white/30 text-xs px-1 -mt-1">
                      {miningResults.fuelSavingLiters} × {fmtC(mFuelPrice)}/L · {mPressureDiff}% déficit → {(mPressureDiff * 0.3).toFixed(1)}% consumo extra
                    </p>
                    <ResultRow
                      label={t.mining?.tireSaving || 'c) Ahorro en reemplazo de neumáticos OTR'}
                      value={miningResults.tireSaving}
                    />
                    <p className="text-white/30 text-xs px-1 -mt-1">
                      {mTiresPerYear} neum × {fmtC(mTireCost)} × {miningResults.tireDegradationPct}% degradación
                    </p>
                    <ResultRow
                      label={t.mining?.downtimeSaving || 'd) Ahorro en downtime / averías (−80%)'}
                      value={miningResults.downtimeSaving}
                    />
                    <p className="text-white/30 text-xs px-1 -mt-1">
                      {mDowntimeEvents} eventos × {mVehicles.toLocaleString('de-DE')} veh × {fmtC(mDowntimeCost)} × 80%
                    </p>
                  </div>
                </div>

                {/* e) Ahorro total + repago */}
                <motion.div
                  key={miningResults.totalAnnualSaving}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[24px] border border-emerald-400/60 bg-gradient-to-br from-emerald-900/40 to-[#1a1830] p-6 flex flex-col gap-3 shadow-[0_0_50px_rgba(52,211,153,0.18)]"
                >
                  <p className="text-emerald-400/80 text-sm font-bold uppercase tracking-widest">
                    {t.mining?.totalSavingLabel || 'e) Ahorro total de la flota por año'}
                  </p>
                  <p className="text-5xl font-extrabold text-emerald-300 tabular-nums leading-none">
                    {miningResults.totalAnnualSaving}
                  </p>
                  {miningResults.paybackMonths && (
                    <p className="text-emerald-400/70 text-sm font-medium">
                      {(t.mining?.paybackLabel || 'Recupero de inversión en {n} meses').replace('{n}', miningResults.paybackMonths)}
                    </p>
                  )}
                  <p className="text-white/30 text-xs leading-relaxed mt-1">{t.mining?.disclaimer || t.disclaimer}</p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  variants={fadeIn('up', 'tween', 0.4, 0.7)}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  <button
                    onClick={() => setModalType('quote')}
                    className="px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:bg-purple-600 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {translations?.cta?.quoteButton || 'Solicitar Cotización'}
                  </button>
                  <button
                    onClick={() => setModalType('demo')}
                    className="px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {translations?.cta?.demoButton || 'Demo Gratuita'}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ContactModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'contact'} />
    </section>
  );
};

export default ROICalculator;
