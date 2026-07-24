import { useTheme } from '../hooks/useTheme';
import { CLASS_PALETTE, CLASS_LABELS, CLASS_DESCS } from '../theme';

interface Props {
  predicted: number;
  confidence: number; // 0..1
}

const GRADIENTS = [
  'linear-gradient(135deg,#dc2626,#f87171)',
  'linear-gradient(135deg,#ea580c,#fb923c)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)',
  'linear-gradient(135deg,#65a30d,#84cc16)',
  'linear-gradient(135deg,#059669,#10b981)',
];

export default function ConditionResult({ predicted, confidence }: Props) {
  const { t } = useTheme();
  const cls = Number(predicted) || 3;
  const classColor = CLASS_PALETTE[cls - 1];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 12,
            color: t.muted,
            textTransform: 'uppercase',
            letterSpacing: '.12em',
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          État prédit
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            padding: 'clamp(24px,3vw,40px) clamp(36px,5vw,64px)',
            borderRadius: 32,
            background: GRADIENTS[cls - 1],
            boxShadow: `0 24px 60px -20px ${classColor}80, inset 0 1px 0 rgba(255,255,255,.2)`,
          }}
        >
          <span
            style={{
              fontFamily: 'Sora',
              fontWeight: 800,
              fontSize: 'clamp(64px,10vw,120px)',
              letterSpacing: '-.04em',
              lineHeight: 1,
              color: '#fff',
            }}
          >
            {cls}
          </span>
          <span
            style={{
              fontFamily: 'Sora',
              fontWeight: 400,
              fontSize: 'clamp(28px,4vw,40px)',
              color: 'rgba(255,255,255,.7)',
              margin: '0 4px 0 2px',
            }}
          >
            /
          </span>
          <span
            style={{
              fontFamily: 'Sora',
              fontWeight: 600,
              fontSize: 'clamp(28px,4vw,40px)',
              color: 'rgba(255,255,255,.85)',
            }}
          >
            5
          </span>
        </div>
        <div
          style={{
            fontFamily: 'Sora',
            fontWeight: 700,
            fontSize: 'clamp(24px,3vw,32px)',
            letterSpacing: '-.02em',
            marginTop: 18,
          }}
        >
          {CLASS_LABELS[cls - 1]}
        </div>
        <div style={{ color: t.muted, marginTop: 6, fontSize: 14 }}>{CLASS_DESCS[cls - 1]}</div>
      </div>

      <div style={{ height: 1, background: t.border, margin: '28px 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
        {CLASS_LABELS.map((label, i) => {
          const n = i + 1;
          const active = n === cls;
          return (
            <div
              key={n}
              style={{
                padding: '12px 8px',
                borderRadius: 12,
                textAlign: 'center',
                background: active ? CLASS_PALETTE[i] : t.chipBg,
                border: `1px solid ${active ? CLASS_PALETTE[i] : t.border}`,
                transform: active ? 'translateY(-4px)' : 'none',
                transition: 'transform .3s',
                boxShadow: active ? `0 12px 24px -8px ${CLASS_PALETTE[i]}80` : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '.05em',
                  color: active ? 'rgba(255,255,255,.75)' : t.muted,
                }}
              >
                0{n}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  marginTop: 3,
                  color: active ? '#fff' : t.muted,
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 99,
            background: t.chipBg,
            border: `1px solid ${t.border}`,
            fontSize: 13.5,
            fontWeight: 500,
            color: t.muted,
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Confiance{' '}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              color: classColor,
              marginLeft: 4,
            }}
          >
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
