import type { CSSProperties } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  scale: string[];
  scalePositions?: number[];
  onChange: (v: number) => void;
}

export default function LabeledSlider({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  scale,
  scalePositions,
  onChange,
}: Props) {
  const { t } = useTheme();
  const range = max - min;

  const positions =
    scalePositions ?? scale.map((_, i) => min + (i * range) / (scale.length - 1));

  // Étiquette active = position la plus proche de la valeur courante.
  let closestIdx = 0;
  let closestDist = Infinity;
  positions.forEach((p, i) => {
    const d = Math.abs(p - value);
    if (d < closestDist) {
      closestDist = d;
      closestIdx = i;
    }
  });

  const marks = scale.map((lbl, i) => {
    const active = i === closestIdx;
    return {
      label: lbl,
      pct: ((positions[i] - min) / range) * 100,
      tickColor: active ? t.primary : t.muted,
      tickOpacity: active ? 1 : 0.4,
      labelColor: active ? t.primary : t.muted,
      labelWeight: active ? 700 : 500,
    };
  });

  // Ticks entiers le long du rail (ex. 13 grades).
  const hasTicks = range <= 13 && step === 1;
  const ticks: CSSProperties[] = [];
  if (hasTicks) {
    for (let k = min; k <= max; k++) {
      const isLabel = positions.some((p) => Math.abs(p - k) < 0.001);
      ticks.push({
        position: 'absolute',
        left: `${((k - min) / range) * 100}%`,
        top: -14,
        transform: 'translateX(-50%)',
        width: 2,
        height: k === value ? 12 : 6,
        borderRadius: 2,
        background: k === value ? t.primary : t.muted,
        opacity: k === value ? 1 : isLabel ? 0.55 : 0.25,
        transition: 'height .15s, opacity .15s',
      });
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 22,
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
          {hint && <div style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>{hint}</div>}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 20, letterSpacing: '-.02em' }}>
            {value}
            <span style={{ color: t.muted, fontSize: 13, fontWeight: 400 }}> / {max}</span>
          </div>
          <div style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>
            {scale[closestIdx] || ''}
          </div>
        </div>
      </div>
      <div style={{ padding: '0 11px', position: 'relative' }}>
        {hasTicks && (
          <div style={{ position: 'relative', height: 0, pointerEvents: 'none' }}>
            {ticks.map((s, i) => (
              <span key={i} style={s} />
            ))}
          </div>
        )}
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: 'relative', zIndex: 1 }}
        />
        <div style={{ position: 'relative', height: 26, marginTop: 10 }}>
          {marks.map((m, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${m.pct}%`,
                top: 0,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{ width: 1, height: 6, background: m.tickColor, opacity: m.tickOpacity }}
              />
              <span
                style={{
                  fontSize: 10.5,
                  color: m.labelColor,
                  textTransform: 'uppercase',
                  letterSpacing: '.05em',
                  fontWeight: m.labelWeight,
                  whiteSpace: 'nowrap',
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
