'use client';
import React, { useContext, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { TitleText, TypingText } from '../components/CustomTexts';
import { LanguageContext } from '../context/LanguageContext';
import { COUNTRIES } from '../config/countries';

// Tipos de cambio aproximados respecto al USD (referencia estática)
const EXCHANGE_RATES = {
  USD: 1,
  MXN: 17.2,
  ARS: 1050,
  BRL: 5.1,
  PEN: 3.75,
  CLP: 950,
  COP: 4100,
  BOB: 6.9,
  UYU: 40,
  EUR: 0.93,
};

const CURRENCY_SYMBOLS = {
  USD: 'US$',
  MXN: 'MX$',
  ARS: 'AR$',
  BRL: 'R$',
  PEN: 'S/',
  CLP: 'CLP$',
  COP: 'COP$',
  BOB: 'Bs.',
  UYU: '$U',
  EUR: '€',
};

// Valores por defecto de los inputs (en USD)
const DEFAULTS_USD = {
  fleetSize: 20,
  tiresPerVehicle: 18,
  tireCostUSD: 450,
  fuelPerKmUSD: 0.35,
  kmPerYear: 120000,
  avgFlatTireCostUSD: 1200,
  flatTiresPerYearPer100: 4,
};

// ─── Supuestos del modelo (fuente: NHTSA, ATRI, datos PressurePro) ──────────
// Modificar estos valores para ajustar el modelo de cálculo.
const TPMS_ASSUMPTIONS = {
  // Reducción de desgaste de neumáticos por uso de TPMS (% del costo de reemplazo anual)
  tireWearReductionPct: 0.15,       // 15% — fuente: NHTSA TPMS final rule

  // Mejora en eficiencia de combustible por TPMS (% del costo de combustible anual)
  fuelEfficiencyGainPct: 0.03,      // 3%  — fuente: NHTSA & U.S. Dept. of Energy

  // Reducción de eventos de pinchadura / pérdida de presión grave gracias a TPMS
  flatTireReductionPct: 0.80,       // 80% — fuente: estudios de campo PressurePro

  // Costo unitario del sensor TPMS (hardware por neumático, USD)
  sensorCostPerTireUSD: 35,

  // Costo de instalación / receptor por vehículo (display + mano de obra, USD)
  installCostPerVehicleUSD: 150,
};

function SliderInput({ label, value, onChange, min, max, step, format, hint }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <label className="text-white/80 text-sm font-medium leading-tight">{label}</label>
          {hint && (
            <span className="group relative flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white/30 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-xl bg-[#2a2845] border border-white/10 px-3 py-2 text-xs text-white/70 leading-snug opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl">{hint}</span>
            </span>
          )}
        </div>
        <span className="text-purple-300 font-bold text-sm tabular-nums flex-shrink-0">
          {format(value)}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
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

function ResultCard({ label, value, positive, strong, negative, delay }) {
  let cardClass = 'border-white/10 bg-white/5';
  let textClass = 'text-white';

  if (negative) {
    cardClass = 'border-red-500/40 bg-gradient-to-br from-red-900/25 to-red-950/10 shadow-[0_0_18px_rgba(239,68,68,0.15)]';
    textClass = 'text-red-400';
  } else if (strong) {
    cardClass = 'border-emerald-400/70 bg-gradient-to-br from-emerald-900/50 to-emerald-950/30 shadow-[0_0_28px_rgba(52,211,153,0.25)]';
    textClass = 'text-emerald-300';
  } else if (positive) {
    cardClass = 'border-emerald-500/40 bg-gradient-to-br from-emerald-900/30 to-emerald-950/10 shadow-[0_0_14px_rgba(52,211,153,0.12)]';
    textClass = 'text-emerald-400';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`flex flex-col gap-1 p-4 rounded-2xl border ${cardClass}`}
    >
      <p className="text-white/60 text-xs leading-tight">{label}</p>
      <p className={`font-bold text-xl tabular-nums ${textClass}`}>{value}</p>
    </motion.div>
  );
}

const ROICalculator = () => {
  const { translations, country } = useContext(LanguageContext);
  const t = translations?.roiCalculator;

  // Detectar moneda del país actual
  const countryConfig = country ? COUNTRIES[country] : null;
  const localCurrency = countryConfig?.currency || 'USD';
  const [useLocalCurrency, setUseLocalCurrency] = useState(false);

  const activeCurrency = useLocalCurrency && localCurrency !== 'USD' ? localCurrency : 'USD';
  const rate = EXCHANGE_RATES[activeCurrency] ?? 1;
  const symbol = CURRENCY_SYMBOLS[activeCurrency] ?? 'US$';

  // Convertir defaults a moneda activa con precisión adaptativa
  const toActive = useCallback((usd) => {
    const val = usd * rate;
    if (val === 0) return 0;
    const magnitude = Math.floor(Math.log10(Math.abs(val)));
    if (magnitude >= 1) return Math.round(val);           // ≥ 10 → entero
    if (magnitude >= 0) return Math.round(val * 10) / 10; // 1–9 → 1 decimal
    return Math.round(val * 100) / 100;                   // < 1 → 2 decimales
  }, [rate]);
  const toUSD = useCallback((val) => val / rate, [rate]);

  // Estado de sliders (almacenados en moneda activa para que el usuario lo vea)
  const [fleet, setFleet] = useState(DEFAULTS_USD.fleetSize);
  const [tiresPerVehicle, setTiresPerVehicle] = useState(DEFAULTS_USD.tiresPerVehicle);
  const [tireCost, setTireCost] = useState(() => toActive(DEFAULTS_USD.tireCostUSD));
  const [fuelPerKm, setFuelPerKm] = useState(() => toActive(DEFAULTS_USD.fuelPerKmUSD));
  const [kmPerYear, setKmPerYear] = useState(DEFAULTS_USD.kmPerYear);
  const [flatTireCost, setFlatTireCost] = useState(() => toActive(DEFAULTS_USD.avgFlatTireCostUSD));
  const [flatTiresRate, setFlatTiresRate] = useState(DEFAULTS_USD.flatTiresPerYearPer100);

  // Recalcular defaults al cambiar moneda
  const prevCurrency = React.useRef(activeCurrency);
  React.useEffect(() => {
    if (prevCurrency.current !== activeCurrency) {
      const prevRate = EXCHANGE_RATES[prevCurrency.current] ?? 1;
      const newRate = EXCHANGE_RATES[activeCurrency] ?? 1;
      const conv = (val) => Math.round((val / prevRate) * newRate);
      setTireCost(v => conv(v));
      setFuelPerKm(v => conv(v));
      setFlatTireCost(v => conv(v));
      prevCurrency.current = activeCurrency;
    }
  }, [activeCurrency]);

  // Cálculos de ROI
  // ─── Todos los ahorros son ANUALES ───────────────────────────────────────
  // ─── La inversión TPMS es un costo ÚNICO (one-time) ─────────────────────
  // ─── El ROI% y beneficio neto son del PRIMER AÑO ─────────────────────────
  const results = useMemo(() => {
    const totalTires = fleet * tiresPerVehicle;
    const tireCostUSD = toUSD(tireCost);
    const fuelPerKmUSD = toUSD(fuelPerKm);
    const flatTireCostUSD = toUSD(flatTireCost);

    // Ahorro anual en neumáticos: (flota × neumáticos/veh) × costo/neumático × 15%
    // Supuesto: neumáticos se reemplazan una vez por año (flota de larga distancia)
    const tireWearSavingUSD = totalTires * tireCostUSD * TPMS_ASSUMPTIONS.tireWearReductionPct;

    // Ahorro anual en combustible: flota × km/año × costo combustible/km × 3%
    const fuelSavingUSD = fleet * kmPerYear * fuelPerKmUSD * TPMS_ASSUMPTIONS.fuelEfficiencyGainPct;

    // Ahorro anual en averías: (flota × tasa/100) × costo por evento × 80%
    const flatTiresPerYear = (fleet * flatTiresRate) / 100;
    const flatTiresSavingUSD = flatTiresPerYear * flatTireCostUSD * TPMS_ASSUMPTIONS.flatTireReductionPct;

    // Inversión única en TPMS (toda la flota):
    //   sensor por neumático: totalTires × $35/sensor
    //   instalación + receptor por vehículo: flota × $150/vehículo
    const tpmsCostUSD =
      totalTires * TPMS_ASSUMPTIONS.sensorCostPerTireUSD +
      fleet * TPMS_ASSUMPTIONS.installCostPerVehicleUSD;

    const totalSavingUSD = tireWearSavingUSD + fuelSavingUSD + flatTiresSavingUSD;
    // Beneficio neto primer año = ahorro anual − inversión inicial
    const netBenefitUSD = totalSavingUSD - tpmsCostUSD;
    // ROI primer año = beneficio neto / inversión × 100
    const roiPct = tpmsCostUSD > 0 ? (netBenefitUSD / tpmsCostUSD) * 100 : 0;
    // Recupero de inversión (meses) = inversión / (ahorro anual / 12)
    const paybackMonths = totalSavingUSD > 0 ? Math.ceil((tpmsCostUSD / totalSavingUSD) * 12) : null;

    const fmt = (usd) => {
      const val = Math.round(usd * rate);
      return `${symbol} ${val.toLocaleString('en-US')}`;
    };

    return {
      tireWearSaving: fmt(tireWearSavingUSD),
      fuelSaving: fmt(fuelSavingUSD),
      flatTiresSaving: fmt(flatTiresSavingUSD),
      tpmsCost: fmt(tpmsCostUSD),
      totalSaving: fmt(totalSavingUSD),
      netBenefit: fmt(netBenefitUSD),
      roi: `${roiPct.toFixed(0)}%`,
      payback: paybackMonths,
      positive: netBenefitUSD > 0,
    };
  }, [fleet, tiresPerVehicle, tireCost, fuelPerKm, kmPerYear, flatTireCost, flatTiresRate, toUSD, rate, symbol]);

  if (!t) return null;

  const fmtCurrency = (val) => {
    const formatted = val < 10 ? val.toFixed(2) : Math.round(val).toLocaleString('en-US');
    return `${symbol} ${formatted}`;
  };
  const fmtNum = (val) => val.toLocaleString('en-US');
  const fmtKm = (val) => `${val.toLocaleString('en-US')} km`;

  // Rango de sliders en moneda activa
  const r = {
    tireCost:    { min: toActive(100),  max: toActive(2000),  step: toActive(10) },
    fuelPerKm:   { min: toActive(0.05), max: toActive(1.5),   step: toActive(0.01) },
    flatTireCost:{ min: toActive(200),  max: toActive(5000),  step: toActive(50) },
  };

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

        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 0.8)}
          className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-8"
        >
          {/* Panel izquierdo: inputs */}
          <div className="flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-br from-[#16142a] via-[#1a1830] to-[#1f1d3a] p-6 md:p-8 h-full">

            {/* Toggle de moneda */}
            {localCurrency !== 'USD' && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 self-start mb-6">
                <span className="text-white/60 text-sm">{t.currencyLabel}</span>
                <button
                  onClick={() => setUseLocalCurrency(false)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                    !useLocalCurrency
                      ? 'bg-purple-600 text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => setUseLocalCurrency(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                    useLocalCurrency
                      ? 'bg-purple-600 text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {localCurrency}
                </button>
              </div>
            )}

            <div className="flex flex-col flex-1 justify-between gap-4">
              <SliderInput label={t.inputs.fleetSize} value={fleet} onChange={setFleet} min={1} max={500} step={1} format={fmtNum} />
              <SliderInput label={t.inputs.tiresPerVehicle} value={tiresPerVehicle} onChange={setTiresPerVehicle} min={4} max={80} step={2} format={fmtNum} />
              <SliderInput label={t.inputs.tireCost} value={tireCost} onChange={setTireCost} min={r.tireCost.min} max={r.tireCost.max} step={r.tireCost.step} format={fmtCurrency} hint={t.inputs.tireCostHint} />
              <SliderInput label={t.inputs.fuelCostPerKm} value={fuelPerKm} onChange={setFuelPerKm} min={r.fuelPerKm.min} max={r.fuelPerKm.max} step={r.fuelPerKm.step} format={fmtCurrency} />
              <SliderInput label={t.inputs.kmPerYear} value={kmPerYear} onChange={setKmPerYear} min={10000} max={500000} step={5000} format={fmtKm} />
              <SliderInput label={t.inputs.flatTireCost} value={flatTireCost} onChange={setFlatTireCost} min={r.flatTireCost.min} max={r.flatTireCost.max} step={r.flatTireCost.step} format={fmtCurrency} hint={t.inputs.flatTireCostHint} />
              <SliderInput label={t.inputs.flatTiresRate} value={flatTiresRate} onChange={setFlatTiresRate} min={0} max={30} step={1} format={(v) => `${v} ${t.inputs.flatTiresRateUnit}`} hint={t.inputs.flatTiresRateHint} />
            </div>
          </div>

          {/* Panel derecho: resultados */}
          <div className="flex flex-col gap-4">

            {/* Tarjeta principal ROI */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`roi-${results.roi}-${results.positive}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-[28px] border p-6 md:p-7 flex flex-col gap-3 ${
                  results.positive
                    ? 'border-emerald-400/60 bg-gradient-to-br from-emerald-900/40 to-[#1a1830] shadow-[0_0_50px_rgba(52,211,153,0.2)]'
                    : 'border-red-500/40 bg-gradient-to-br from-red-900/20 to-[#1a1830] shadow-[0_0_40px_rgba(239,68,68,0.12)]'
                }`}
              >
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{t.results.roiLabel}</p>
                <div className="flex items-end gap-4 flex-wrap">
                  <span className={`font-extrabold text-5xl md:text-6xl tabular-nums leading-none ${results.positive ? 'text-emerald-300' : 'text-red-400'}`}>
                    {results.roi}
                  </span>
                  {results.payback && (
                    <span className={`text-sm mb-1 font-medium ${results.positive ? 'text-emerald-400/80' : 'text-white/40'}`}>
                      {t.results.paybackLabel.replace('{n}', results.payback)}
                    </span>
                  )}
                </div>
                <p className="text-white/35 text-[11px] leading-relaxed">{t.results.roiNote}</p>
              </motion.div>
            </AnimatePresence>

            {/* Grupo: Ahorros anuales */}
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{t.results.annualSavingsLabel}</p>
                <p className="text-white/30 text-[11px]">{t.results.annualSavingsNote}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <ResultCard label={t.results.tireWearSaving} value={results.tireWearSaving} positive delay={0.05} />
                <ResultCard label={t.results.fuelSaving} value={results.fuelSaving} positive delay={0.1} />
                <ResultCard label={t.results.flatTiresSaving} value={results.flatTiresSaving} positive delay={0.15} />
              </div>
            </div>

            {/* Grupo: Inversión y resultado */}
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{t.results.investmentLabel}</p>
                <p className="text-white/30 text-[11px]">{t.results.investmentNote}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <ResultCard label={t.results.tpmsCost} value={results.tpmsCost} delay={0.2} />
                <ResultCard label={t.results.totalSaving} value={results.totalSaving} strong delay={0.25} />
                <ResultCard label={t.results.netBenefit} value={results.netBenefit} strong={results.positive} negative={!results.positive} delay={0.3} />
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-white/30 text-[11px] leading-relaxed px-1">
              {t.disclaimer}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ROICalculator;
