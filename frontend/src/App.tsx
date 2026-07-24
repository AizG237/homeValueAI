import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from './hooks/useTheme';
import { predictCondition } from './lib/api';
import type { HouseForm, PredictResponse, Status, View } from './types';
import { ctaSmall, iconBtn, logoMark, navLink } from './lib/ui';
import Landing from './views/Landing';
import Wizard from './views/Wizard';
import Result from './views/Result';

const DEFAULT_FORM: HouseForm = {
  bedrooms: 3,
  bathrooms: 2.25,
  floors: 1.5,
  sqft_living: 2080,
  sqft_basement: 400,
  sqft_lot: 7500,
  price: 650000,
  grade: 8,
  view: 0,
  waterfront: 0,
  was_renovated: 0,
  house_age: 45,
  yr_sold: 2015,
  zipcode: '98052',
  lat: 47.62,
  long: -122.15,
  sqft_living15: 1990,
  sqft_lot15: 7200,
};

export default function App() {
  const { t, isDark, toggle } = useTheme();

  const [view, setView] = useState<View>('landing');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState<HouseForm>(DEFAULT_FORM);

  const setField = <K extends keyof HouseForm>(key: K, value: HouseForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const goHome = () => setView('landing');
  const startForm = () => {
    setView('form');
    setStep(1);
  };

  const submitForm = async () => {
    setView('result');
    setStatus('loading');
    try {
      const res = await predictCondition(form);
      setResult(res);
      setStatus('success');
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Le service est momentanément indisponible.');
      setStatus('error');
    }
  };

  const resetAll = () => {
    setView('form');
    setStep(1);
    setStatus('idle');
    setResult(null);
  };

  const shellStyle: CSSProperties = {
    minHeight: '100vh',
    background: t.bg,
    color: t.text,
    position: 'relative',
    overflowX: 'hidden',
    transition: 'background .4s ease, color .4s ease',
  };
  const meshBgStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    background: isDark
      ? `radial-gradient(60% 45% at 15% 15%, rgba(4,120,87,.28) 0%, transparent 60%),
         radial-gradient(50% 40% at 90% 10%, rgba(245,158,11,.14) 0%, transparent 60%),
         radial-gradient(70% 50% at 80% 100%, rgba(16,185,129,.18) 0%, transparent 60%)`
      : `radial-gradient(60% 45% at 10% 5%, rgba(16,185,129,.18) 0%, transparent 60%),
         radial-gradient(50% 40% at 100% 5%, rgba(245,158,11,.12) 0%, transparent 60%),
         radial-gradient(70% 50% at 90% 100%, rgba(4,120,87,.10) 0%, transparent 60%)`,
  };
  const gridBgStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 1,
    opacity: isDark ? 0.35 : 0.5,
    backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
    backgroundSize: '60px 60px',
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
  };

  return (
    <div style={shellStyle}>
      <div style={meshBgStyle} />
      <div style={gridBgStyle} />

      {/* NAV */}
      <header
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px clamp(20px,5vw,56px)',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <button onClick={goHome} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={logoMark(t)}>
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 14 L16 5 L27 14 V26 A2 2 0 0 1 25 28 H7 A2 2 0 0 1 5 26 Z" />
              <path d="M12 28 V19 H20 V28" />
              <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>
            HomeValue<span style={{ color: t.accent }}>.AI</span>
          </span>
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {view === 'landing' && (
            <>
              <a href="#how" className="hv-navlink" style={navLink(t)}>
                Comment ça marche
              </a>
              <a href="#trust" className="hv-navlink" style={navLink(t)}>
                Précision
              </a>
            </>
          )}
          <button onClick={toggle} title="Thème" className="hv-press" style={iconBtn(t)} aria-label="Basculer thème">
            {isDark ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button onClick={startForm} className="hv-press" style={ctaSmall(t)}>
            Estimer
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </header>

      {view === 'landing' && <Landing onStart={startForm} />}
      {view === 'form' && (
        <Wizard
          form={form}
          step={step}
          setStep={setStep}
          setField={setField}
          onBack={goHome}
          onSubmit={submitForm}
        />
      )}
      {view === 'result' && (
        <Result
          status={status}
          result={result}
          form={form}
          errorMsg={errorMsg}
          onRetry={submitForm}
          onEdit={startForm}
          onReset={resetAll}
        />
      )}
    </div>
  );
}
