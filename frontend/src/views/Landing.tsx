import { useTheme } from '../hooks/useTheme';
import StepIcon from '../components/StepIcon';
import { ctaGhost, ctaPrimary, eyebrow, h2, logoMark, pill } from '../lib/ui';

const STEPS = [
  {
    n: '01',
    icon: 'form' as const,
    title: 'Décrivez le bien',
    desc: 'Renseignez surfaces, prix, qualité et localisation en 3 étapes guidées. Aucun compte requis.',
  },
  {
    n: '02',
    icon: 'brain' as const,
    title: "L'analyse IA",
    desc: '17 caractéristiques passées à un Random Forest Classifier entraîné sur 21 000 transactions.',
  },
  {
    n: '03',
    icon: 'chart' as const,
    title: 'Résultat instantané',
    desc: "Classe d'état de 1 à 5, avec le niveau de confiance et la probabilité de chaque classe.",
  },
];

export default function Landing({ onStart }: { onStart: () => void }) {
  const { t, isDark } = useTheme();

  return (
    <main
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,56px) 80px',
        width: '100%',
      }}
    >
      {/* HERO */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,1fr)',
          gap: 56,
          alignItems: 'center',
          padding: 'clamp(40px,7vw,88px) 0',
          minHeight: 'calc(100vh - 96px)',
        }}
        className="hv-hero"
      >
        <div style={{ animation: 'fadeUp .8s cubic-bezier(.22,1,.36,1) both', minWidth: 0 }}>
          <div style={pill(t)}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 99,
                background: t.accent,
                boxShadow: `0 0 12px ${t.accent}`,
              }}
            />
            Machine Learning · Random Forest Classifier · 5 classes
          </div>
          <h1
            style={{
              fontFamily: 'Sora',
              fontWeight: 800,
              fontSize: 'clamp(40px,6vw,76px)',
              lineHeight: 1.02,
              letterSpacing: '-.035em',
              margin: '22px 0 20px',
            }}
          >
            L'état réel
            <br />
            de votre bien,
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontStyle: 'italic',
                fontWeight: 700,
              }}
            >
              classé par l'IA.
            </span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px,1.4vw,19px)',
              lineHeight: 1.55,
              maxWidth: 560,
              color: t.muted,
              margin: '0 0 34px',
            }}
          >
            Classification instantanée de l'état d'un bien immobilier - de « Mauvais » à
            « Excellent » - avec la probabilité de chaque classe. Modèle entraîné sur des dizaines
            de milliers de transactions.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
            <button onClick={onStart} className="hv-lift" style={ctaPrimary(t)}>
              Estimer l'état du bien
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 10 }}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#how" style={ctaGhost(t)}>
              Comment ça marche
            </a>
          </div>
          <div style={{ display: 'flex', gap: 36, marginTop: 52, flexWrap: 'wrap' }}>
            {[
              { v: '5', l: "classes d'état" },
              { v: '21 613', l: 'biens analysés' },
              { v: '<1s', l: 'temps de réponse' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 36 }}>
                {i > 0 && <div style={{ width: 1, background: t.border, alignSelf: 'stretch' }} />}
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 28, letterSpacing: '-.02em' }}>
                    {s.v}
                  </div>
                  <div style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ position: 'relative', minHeight: 520, animation: 'fadeUp 1s cubic-bezier(.22,1,.36,1) .1s both' }}>
          <div
            style={{
              position: 'relative',
              padding: 28,
              borderRadius: 28,
              background: isDark ? 'rgba(17,26,32,.7)' : 'rgba(255,255,255,.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${t.border}`,
              boxShadow: isDark ? '0 30px 60px -20px rgba(0,0,0,.6)' : '0 30px 60px -20px rgba(10,15,20,.15)',
              animation: 'floatY 6s ease-in-out infinite',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 12, color: t.muted, textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600 }}>
                  Prédiction d'état
                </div>
                <div style={{ fontSize: 13, color: t.muted, marginTop: 4 }}>Bellevue · 3 ch · 210m²</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 99, background: t.chipBg, fontSize: 10.5, fontWeight: 700, letterSpacing: '.1em' }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#10b981', animation: 'pulseRing 2s infinite' }} />
                LIVE
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <div
                style={{
                  fontFamily: 'Sora',
                  fontWeight: 800,
                  fontSize: 'clamp(72px,10vw,110px)',
                  letterSpacing: '-.04em',
                  lineHeight: 0.9,
                  background: 'linear-gradient(135deg,#059669 0%,#10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                4<span style={{ fontWeight: 400, color: t.muted, fontSize: '.4em', WebkitTextFillColor: t.muted }}>/5</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em' }}>Bon</div>
                <div style={{ fontSize: 12, color: t.muted }}>état estimé</div>
              </div>
            </div>
            <div style={{ height: 1, background: t.border, margin: '22px 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ padding: 14, borderRadius: 14, background: t.chipBg, border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Confiance</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22 }}>60</span>
                  <span style={{ fontSize: 12, color: t.muted }}>%</span>
                </div>
                <div style={{ height: 4, borderRadius: 99, background: t.border, marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg,#65a30d,#10b981)' }} />
                </div>
              </div>
              <div style={{ padding: 14, borderRadius: 14, background: t.chipBg, border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Distribution</div>
                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 30, marginTop: 8 }}>
                  {['rgba(220,38,38,.5)', 'rgba(234,88,12,.5)', 'rgba(245,158,11,.5)', 'linear-gradient(180deg,#84cc16,#65a30d)', 'rgba(5,150,105,.5)'].map((bg, i) => (
                    <div key={i} style={{ flex: 1, background: bg, height: ['8%', '15%', '30%', '100%', '25%'][i], borderRadius: 2 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: -22,
              left: -18,
              padding: '12px 16px',
              borderRadius: 16,
              background: t.surface,
              border: `1px solid ${t.border}`,
              boxShadow: isDark ? '0 18px 32px -12px rgba(0,0,0,.6)' : '0 18px 32px -12px rgba(10,15,20,.18)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: t.primary,
              animation: 'floatY 5s ease-in-out infinite .8s',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 L2 22 H22 Z" />
              <path d="M12 8 V15" />
              <circle cx="12" cy="18" r=".8" fill="currentColor" stroke="none" />
            </svg>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Grade</div>
              <div style={{ fontSize: 11, color: t.muted }}>10/13 · Excellent</div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -22,
              right: -14,
              padding: '12px 16px',
              borderRadius: 16,
              background: t.surface,
              border: `1px solid ${t.border}`,
              boxShadow: isDark ? '0 18px 32px -12px rgba(0,0,0,.6)' : '0 18px 32px -12px rgba(10,15,20,.18)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: t.accent,
              animation: 'floatY 7s ease-in-out infinite .3s',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Vue lac</div>
              <div style={{ fontSize: 11, color: t.muted }}>Waterfront · Oui</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '80px 0', scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 640, margin: '0 auto 56px', textAlign: 'center' }}>
          <div style={eyebrow(t)}>Processus</div>
          <h2 style={h2()}>
            Trois étapes,
            <br />
            un état classifié.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                padding: 28,
                borderRadius: 24,
                background: t.surface,
                border: `1px solid ${t.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: t.chipBg,
                    fontFamily: 'Sora',
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {s.n}
                </span>
                <span style={{ color: t.muted, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>/03</span>
              </div>
              <div style={{ color: t.primary, marginBottom: 14 }}>
                <StepIcon kind={s.icon} color={t.primary} />
              </div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em', margin: '0 0 8px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: t.muted, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" style={{ padding: '80px 0', scrollMarginTop: 80 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 40,
            alignItems: 'center',
            padding: 'clamp(28px,4vw,48px)',
            borderRadius: 32,
            background: t.surface,
            border: `1px solid ${t.border}`,
            boxShadow: isDark ? '0 30px 60px -30px rgba(0,0,0,.6)' : '0 30px 60px -30px rgba(10,15,20,.12)',
          }}
        >
          <div>
            <div style={eyebrow(t)}>Confiance</div>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.05, letterSpacing: '-.03em', margin: '12px 0 16px' }}>
              Une classification calibrée, avec la confiance en prime.
            </h2>
            <p style={{ color: t.muted, lineHeight: 1.6, fontSize: 15.5, maxWidth: 520, margin: '0 0 26px' }}>
              Random Forest Classifier entraîné sur le dataset King County. 17 caractéristiques en
              entrée, la classe d'état la plus probable en sortie - accompagnée de la distribution
              complète des probabilités.
            </p>
            <button onClick={onStart} className="hv-lift" style={ctaPrimary(t)}>
              Tester maintenant
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { v: '5', l: "Classes d'état" },
              { v: '17', l: 'Variables analysées' },
              { v: '21k+', l: "Ventes d'entraînement" },
              { v: '<1s', l: 'Latence moyenne' },
            ].map((s, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 20, background: t.chipBg, border: `1px solid ${t.border}` }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 44, letterSpacing: '-.03em', color: t.primary }}>{s.v}</div>
                <div style={{ fontSize: 13, color: t.muted, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: '32px 0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          fontSize: 13,
          color: t.muted,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={logoMark(t, true)}>
            <svg viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 14 L16 5 L27 14 V26 A2 2 0 0 1 25 28 H7 A2 2 0 0 1 5 26 Z" />
            </svg>
          </span>{' '}
          HomeValue.AI · 2026
        </div>
        <div>Estimations à titre indicatif · Données : King County, Seattle</div>
      </footer>
    </main>
  );
}
