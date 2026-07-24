import { useTheme } from '../hooks/useTheme';
import { CLASS_PALETTE, CLASS_LABELS } from '../theme';

interface Props {
  probabilities: Record<string, number>;
  predicted: number;
}

const BAR_GRADIENTS = [
  'linear-gradient(180deg,#f87171,#dc2626)',
  'linear-gradient(180deg,#fb923c,#ea580c)',
  'linear-gradient(180deg,#fbbf24,#f59e0b)',
  'linear-gradient(180deg,#84cc16,#65a30d)',
  'linear-gradient(180deg,#10b981,#059669)',
];

export default function ProbabilityChart({ probabilities, predicted }: Props) {
  const { t } = useTheme();
  const values = [1, 2, 3, 4, 5].map((n) => probabilities[n] ?? probabilities[String(n)] ?? 0);
  const max = Math.max(0.01, ...values);

  const bars = [1, 2, 3, 4, 5].map((n) => {
    const p = values[n - 1];
    const active = n === predicted;
    return {
      n,
      label: CLASS_LABELS[n - 1],
      pct: (p * 100).toFixed(1),
      heightPct: Math.max(3, (p / max) * 100),
      active,
    };
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, letterSpacing: '-.02em', margin: 0 }}>
          Distribution des probabilités
        </h3>
        <span
          style={{
            fontSize: 11,
            color: t.muted,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            fontWeight: 600,
          }}
        >
          Softmax
        </span>
      </div>
      <p style={{ color: t.muted, fontSize: 13, margin: '0 0 22px' }}>
        Confiance du modèle pour chaque classe d'état.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,1fr)',
          gap: 12,
          alignItems: 'end',
          height: 200,
          padding: '0 4px',
        }}
      >
        {bars.map((b) => (
          <div
            key={b.n}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: b.active ? CLASS_PALETTE[b.n - 1] : t.muted,
                marginBottom: 6,
              }}
            >
              {b.pct}%
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: 56,
                height: `${b.heightPct}%`,
                borderRadius: '12px 12px 4px 4px',
                background: b.active ? BAR_GRADIENTS[b.n - 1] : 'rgba(10,15,20,.08)',
                border: b.active ? 'none' : `1px solid ${t.border}`,
                boxShadow: b.active ? `0 12px 24px -10px ${CLASS_PALETTE[b.n - 1]}80` : 'none',
                transition: 'height 1.2s cubic-bezier(.22,1,.36,1)',
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginTop: 10, padding: '0 4px' }}>
        {bars.map((b) => (
          <div key={b.n} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'Sora',
                fontWeight: b.active ? 700 : 500,
                fontSize: 15,
                color: b.active ? CLASS_PALETTE[b.n - 1] : t.muted,
              }}
            >
              {b.n}
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: t.muted,
                marginTop: 2,
                textTransform: 'uppercase',
                letterSpacing: '.05em',
                fontWeight: 500,
              }}
            >
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
