import type { CSSProperties } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}

export default function Stepper({
  label,
  hint,
  value,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: Props) {
  const { t } = useTheme();
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const apply = (delta: number) => onChange(clamp(+(Number(value) + delta).toFixed(2)));
  const display = step < 1 ? value.toFixed(2).replace(/\.?0+$/, '') : String(value);

  const btnStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: `1px solid ${t.border}`,
    background: 'transparent',
    fontSize: 20,
    fontWeight: 600,
    transition: 'transform .1s, background .2s',
  };

  return (
    <div>
      <div style={{ marginBottom: 12, minHeight: 38 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        {hint && <div style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>{hint}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => apply(-step)} style={btnStyle} aria-label="Diminuer">
          −
        </button>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '10px 14px',
            borderRadius: 12,
            border: `1px solid ${t.border}`,
            fontFamily: 'Sora',
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '-.02em',
          }}
        >
          {display}
        </div>
        <button onClick={() => apply(step)} style={btnStyle} aria-label="Augmenter">
          +
        </button>
      </div>
    </div>
  );
}
