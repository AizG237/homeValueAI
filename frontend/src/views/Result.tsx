import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import type { HouseForm, PredictResponse, Status } from '../types';
import { ctaGhost, ctaPrimary, eyebrow, panel } from '../lib/ui';
import ConditionResult from '../components/ConditionResult';
import ProbabilityChart from '../components/ProbabilityChart';

const VIEW_SCALE = ['Aucune', 'Faible', 'Moyenne', 'Bonne', 'Exceptionnelle'];
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

interface Props {
  status: Status;
  result: PredictResponse | null;
  form: HouseForm;
  errorMsg: string;
  onRetry: () => void;
  onEdit: () => void;
  onReset: () => void;
}

export default function Result({ status, result, form, errorMsg, onRetry, onEdit, onReset }: Props) {
  const { t } = useTheme();
  const [shared, setShared] = useState(false);

  const summary = [
    { label: 'Chambres', value: form.bedrooms },
    { label: 'Salles de bain', value: form.bathrooms },
    { label: 'Étages', value: form.floors },
    { label: 'Surface hab.', value: `${fmt(form.sqft_living)} sqft` },
    { label: 'Terrain', value: `${fmt(form.sqft_lot)} sqft` },
    { label: 'Prix', value: `$${fmt(form.price)}` },
    { label: 'Grade', value: `${form.grade}/13` },
    { label: 'Vue', value: VIEW_SCALE[form.view] || '-' },
    { label: 'Rénové', value: form.was_renovated ? 'Oui' : 'Non' },
    { label: 'Âge', value: `${form.house_age} ans` },
    { label: 'Code postal', value: form.zipcode },
  ];

  const share = async () => {
    const text = result
      ? `HomeValue.AI - État prédit : ${result.predicted_condition}/5 (${result.label}), confiance ${Math.round(
          result.confidence * 100,
        )}%.`
      : 'HomeValue.AI';
    try {
      if (navigator.share) await navigator.share({ title: 'HomeValue.AI', text });
      else await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      /* annulé par l'utilisateur */
    }
  };

  return (
    <main
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px clamp(16px,4vw,40px) 80px',
        width: '100%',
        animation: 'fadeIn .5s ease',
      }}
    >
      {status === 'loading' && (
        <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', border: `3px solid ${t.border}`, borderTopColor: t.primary, animation: 'spin 1s linear infinite' }} />
          <div>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em' }}>Analyse en cours…</div>
            <div style={{ color: t.muted, marginTop: 6, fontSize: 14 }}>Le modèle classifie 17 caractéristiques.</div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, textAlign: 'center' }}>
          <div style={{ color: '#dc2626' }}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22 }}>Impossible d'estimer</div>
            <div style={{ color: t.muted, marginTop: 6 }}>{errorMsg}</div>
          </div>
          <button onClick={onRetry} className="hv-lift" style={ctaPrimary(t)}>
            Réessayer
          </button>
        </div>
      )}

      {status === 'success' && result && (
        <div style={{ animation: 'fadeUp .6s cubic-bezier(.22,1,.36,1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ ...eyebrow(t), display: 'inline-block' }}>Classification IA</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.05, letterSpacing: '-.03em', margin: '14px 0 8px' }}>
              État prédit du bien
            </h1>
            <p style={{ color: t.muted, margin: 0 }}>Random Forest Classifier · 17 variables · 5 classes</p>
          </div>

          {/* Hero result card */}
          <div style={{ ...panel(t), padding: 'clamp(28px,4vw,44px)' }}>
            <ConditionResult predicted={result.predicted_condition} confidence={result.confidence} />
          </div>

          {/* Probability chart + summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20, marginTop: 20 }}>
            <div style={panel(t)}>
              <ProbabilityChart probabilities={result.probabilities} predicted={result.predicted_condition} />
            </div>

            <div style={panel(t)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, letterSpacing: '-.02em', margin: 0 }}>Récapitulatif</h3>
                <button
                  onClick={onEdit}
                  className="hv-press"
                  style={{ padding: '7px 14px', borderRadius: 99, border: `1px solid ${t.border}`, fontSize: 13, fontWeight: 500, color: t.muted }}
                >
                  Modifier
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
                {summary.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 15, marginTop: 2 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 32 }}>
            <button onClick={onReset} className="hv-lift" style={ctaPrimary(t)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 10 }}>
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nouvelle estimation
            </button>
            <button onClick={share} style={ctaGhost(t)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 10 }}>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              {shared ? 'Copié !' : 'Partager'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
